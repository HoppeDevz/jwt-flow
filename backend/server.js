const express = require("express");
const routes = require("./src/routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(40120, () => {
    console.log("SERVER IS RUNNING IN PORT 40120")
});