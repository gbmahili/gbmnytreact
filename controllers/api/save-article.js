// require express
const express = require("express");
// Require our News model
const SavedNews = require("./../../models/CreateArticle.model");

module.exports = app => {
    // Save Article Route:
  app.post("/api/keepArticle", function (req, res) {
    // Get article to save using the data retrieved from the dabase through the id cliced
    var articleToSave = {
      NewsTitle: req.body.articleName,
      NewsArticleURL: req.body.articleURL,
      PublishedDate: req.body.publishedDate
    };
    
    // Save that article to the SavedNews Collection
    SavedNews.create(articleToSave, (err, favoriteArticles) => {
      if (err) {
        res.send(err);
      } else {
        res.json(favoriteArticles);
      }
    });
  });
};