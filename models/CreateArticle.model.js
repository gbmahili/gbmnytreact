// Require mongoose
const mongoose = require("mongoose");
// Instanciate our schema
var Schema = mongoose.Schema;
// Create a new article from our schema
var NewsArticleSchema = new Schema({
    NewsTitle: {
        type : String,
        required : "Title is Required"
    },
    NewsArticleURL: {
        type: String,
        required: "URL is required"
        
    },
    PublishedDate: {
        type: String,
        required: "Published Date is Required"
    }
});

// Export our new NewsArticle schema to be used
module.exports = mongoose.model("SavedNews", NewsArticleSchema);