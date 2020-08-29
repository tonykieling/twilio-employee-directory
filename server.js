const express     = require("express");
const PORT        = process.env.PORT || 3333;
const app         = express();
const morgan      = require("morgan");
// const bodyParser  = require("body-parser");
// const mongoose    = require("mongoose");
// require('dotenv').config();

const employeeRoute      = require("./routes/directory.js");


app.use(morgan("dev"));


app.use("/directory", employeeRoute);


app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
