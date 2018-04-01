// require express
const express = require("express");
// Require our News model
const SavedNews = require("./../../models/CreateArticle.model");

module.exports = app => {
    // Save Article Route:
    app.delete("/api/saved", function (req, res) {
        console.log(req.body.article_id)
        // Save that article to the SavedNews Collection
        SavedNews.remove({_id: req.body.article_id}, (err, deletedArticle) => {
            if (err) {
                res.send(err);
            } else {
                res.json(deletedArticle);
            }
        });
    });
};