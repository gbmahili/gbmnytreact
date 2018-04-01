// Get all dependencies needed to run this application:
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
// Create the express instance
const app = express();
app.use(express.static(path.resolve(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Get all the api routes saved inside of index.js
require("./controllers/index")(app);
// use port 4000 or the environment's assigned port...such as Heroku's own port
var PORT = process.env.PORT || 8080;
// If deployed to heroku, use the deployed database (process.env.MONGODB_URI). Otherwise use the local nytreact database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// Any other request should be routed to this homepage:
app.get("*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
    res.sendFile(path.join(__dirname, "index.html"));
})
// Start the server
app.listen(PORT, () => console.log(`App started at port ${PORT}!`));