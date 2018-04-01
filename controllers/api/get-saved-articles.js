// require express
const express = require("express");
// Require our News model
const SavedNews = require("./../../models/CreateArticle.model");

module.exports = app => {
    app.get("/api/saved", function (req, res) {
        // Retrieve all articles from SavedNews
        SavedNews.find({}, (err, savedArticles) => {
            if (err) {
                res.send(err.message);
            } else {
                res.json(savedArticles);
            }
        })
    });
}