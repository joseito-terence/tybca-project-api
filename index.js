const express = require("express");
const algoliaRouter = require('./routes/algolia.js');

const app = express();

app.use(express.json());

// algolia indexing routes
app.use(algoliaRouter);

// PORT (Environment Variable)
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}.....`));
