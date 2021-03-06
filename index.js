const express = require("express");

const app = express();

app.use(express.json());

const router = require("./src/routes");

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
