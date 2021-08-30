const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/my-crud-app")
    .then(() => console.log("Database is connected"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

app.use("/", require("./routes"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));