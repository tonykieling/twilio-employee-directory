const express       = require("express");
const PORT          = process.env.PORT || 3210;
const app           = express();
const cookieParser  = require("cookie-parser");
const morgan        = require("morgan");
const bodyParser    = require("body-parser");


const employeeRoute      = require("./routes/directory.js");

app.use(morgan("dev"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// connect to the database
const mongoose    = require("mongoose");
require('dotenv').config();
try {
  mongoose.connect(process.env.DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(console.log(" => MongoDB connection success!:::"))
    .catch(error => console.log("Something bad has happened:", error.message));

} catch (err) {
  console.log("error on MongoDB connection: ", err);
}


// endpoints
app.use("/directory", employeeRoute); // it searchs for an employee


// server running and listening
app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
