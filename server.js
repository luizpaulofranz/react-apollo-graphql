const express = require("express");
const mongoose = require("mongoose");
// to read our env variables file
require("dotenv").config({path: "variables.env"});

// connects to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Successfully connected!"))
    .catch( err => console.log(err));

// initialize application
const app = express();
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}.`);
});