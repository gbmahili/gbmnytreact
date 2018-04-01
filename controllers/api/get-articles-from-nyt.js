// require express
const express = require("express");
const request = require("request");
// Export the saved query
module.exports = app => {
    const NYT_API_KEY = "ddab414e9a924d75bc1cd66ae4933b41";
    
    app.post("/api/saved", function(req, res){
        console.log(req.body);
        request.get({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: {
                'api-key': NYT_API_KEY,
                'q': req.body.searchTerm,
                'begin_date': req.body.dateFrom,
                'end_date': req.body.dateTo,
                'fl': 'pub_date, web_url, headline, multimedia, snippet'
            },
            }, function (err, response, body) {
                if(err){
                    console.log(err.message);
                }else{
                    if (body){
                        // Parse the body
                        body = JSON.parse(body);
                        // Check if the status is ok
                        if(body.status == "OK") {
                            res.json(body);
                        } else {
                            console.log("SOMETHING IS WRONG WITH THE REQUEST");
                            res.json({ error: "Error Code 503: The New York Times API is currently unavailable. Check back soon!" });
                        }
                    }
                }
            }
        );
    });
}