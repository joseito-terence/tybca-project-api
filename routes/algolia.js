const express = require('express');
const algoliasearch = require("algoliasearch");
const client = algoliasearch("7LY0YPT76V", "67c441afe8bda9a32e20849908f18221");
const index = client.initIndex("Products");

const router = express.Router();


// Add and Update in the index.
router.post("/algolia", (req, res) => {
  /* .saveObject(obj)
   * If the objectID exists, the record will be replaced
   * If the objectID is specified but does not exist, the record is created
   * If the objectID is not specified, the method returns an error
   */

  const product = req.body;
  
  if (!product.id) {
    // 400 Bad Request
    res.status(400).send("ObjectID required");
    return;
  }

  index.saveObject({
    objectID: product.id,
    ...product,
    price: Number(product.price),
    images: product.images[0],
  })
  .then(({ objectID }) => res.send(objectID));
});

// Delete Record from the index.
router.delete("/algolia/:pid", (req, res) => {
  const { pid } = req.params;

  index
    .deleteObject(pid)
    .then(({ objectID }) => res.send(objectID))
    .catch((err) => res.status(400).send(err));
});

// Reset Index. (Clear all items in the index)
router.delete("/aloglia/reset", (req, res) => {
  index
    .clearObjects()
    .then(() =>
      res.send({
        status: "Success",
        message: "All products deleted from index.",
      })
    )
    .catch((err) => res.send(err));
});

// router.put("/api/algolia/syncdb", (req, res) => {

// });



module.exports = router;
