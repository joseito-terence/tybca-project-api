const express = require("express");
const cors = require('cors');
const algoliaRouter = require('./routes/algolia.js');
const firebaseRouter = require('./routes/firebase');

const app = express();

app.use(cors);
app.use(express.json());

// algolia indexing routes
app.use(algoliaRouter);

// firebase admin routes
app.use(firebaseRouter);

// PORT (Environment Variable)
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}.....`));
