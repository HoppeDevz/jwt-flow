const express = require("express");
const routes = require("./src/routes");
const app = express();

app.use(express.json());

app.listen(40120, () => {
    console.log("SERVER IS RUNNING IN PORT 40120")
});

app.use(routes);