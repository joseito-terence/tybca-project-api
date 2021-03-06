const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS); 
// const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// disable or enable user in firebase auth
router.put('/user/:option', async (req, res) => {
  const { option } = req.params;
  let { uid, userType } = req.body;

  if(option && uid && userType) {
    if(option === 'disable' || option === 'enable') {
      const disabled = option === 'disable' ? true : false;
      let docId = uid;    
      console.log(option, uid, userType, disabled);

      if(userType === 'customers') {
        const userRecord =  await admin.auth().getUserByEmail(docId);    
        uid = userRecord.uid;
      }

      admin.auth()
        .updateUser(uid, { disabled })                // disable user
        .then(() => {
          return db.doc(`${userType}/${docId}`).set({ disabled }, { merge: true });  // make a record in db also.
        })
        .then(() => res.send(`User has been ${option}d.`))
        .catch((err) => res.status(400).send(err));
    }else{
      return res.status(400).send('Option can either be enable or disable.');
    }
  }
});

// delete user completely with db records.
router.delete('/user/:uid', async (req, res) => {
  let { uid } = req.params;
  let userType = (uid.indexOf('@') !== -1) ? 'customers' : 'sellers';
  let docId = uid;    

  if(!uid){
    return res.status(400).send({ code: 'uid-empty', message: 'uid is required.' });
  }

  if(userType === 'customers') {
    const userRecord =  await admin.auth().getUserByEmail(docId);    
    uid = userRecord.uid;
  }

  console.log(userType,'=>' ,docId, uid);

  admin.auth()
    .deleteUser(uid)                                        // delete user
    .then(() => db.doc(`${userType}/${docId}`).delete())      // delete user's records from db.
    .then(() => res.send('Successfully deleted user.'))
    .catch(async (err) => {
      if(err.code === 'auth/user-not-found') {    // if user is not found in the auth, delete it from the db.
        await db.doc(`${userType}/${docId}`).delete()
          .then(() => res.send('Successfully deleted user.'))
          .catch(err => res.status(400).send(err.message));
      }
      res.status(400).send(err.message);
    });
});

// CANCEL ORDER
router.put('/order/cancel/:orderId', (req, res) => {
  const { orderId } = req.params;

  db.doc(`orders/${orderId}`).set({ status: 'canceled' }, { merge: true })
    .then(() => res.send('Order has been canceled.'))
    .catch((err) => res.status(400).send(err));
})


module.exports = router;
