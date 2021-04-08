const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

// disable or enable user in firebase auth
router.post('/user/:option', (req, res) => {
  const { option } = req.params;
  const { uid, userType } = req.body;

  if(option && uid && userType) {
    if(option === 'disable' || option === 'enable') {
      const disabled = option === 'disable' ? true : false;
  
      admin.auth()
        .updateUser(uid, { disabled })                // disable user
        .then(userRecord => {
          return db.doc(`${userType}/${uid}`).set({ disabled }, { merge: true });  // make a record in db also.
        })
        .then(() => res.send(`User has been ${option}d.`))
        .catch((err) => res.status(400).send(err));
    }else{
      return res.status(400).send('Option can be enable or disable.');
    }
  }
});



// delete user completely with db records.
router.delete('/user/:uid', (req, res) => {
  const { uid } = req.params;
  const { userType } = req.body;

  if(!userType){
    return res.status(400).send({ code: 'user-type-empty', message: 'user-type is required.' });
  }

  if(!uid){
    return res.status(400).send({ code: 'uid-empty', message: 'uid is required.' });
  }

  admin.auth()
    .deleteUser(uid)
    .then(() => db.doc(`${userType}/${uid}`).delete())
    .then(() => res.send('Successfully deleted user.'))
    .catch((err) => res.status(400).send(err));
});


module.exports = router;
