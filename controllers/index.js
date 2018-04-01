// require express
const express = require("express");
// Require our News model
const SavedNews = require("./../models/CreateArticle.model");
// Export all the routes
module.exports = app => {
    require("./api/get-articles-from-nyt")(app);
    require("./api/save-article")(app);
    require("./api/get-saved-articles")(app);
    require("./api/delete-article")(app);
};