import React, { Component } from 'react';
import ShowSavedArticles from './api/ShowSavedArticles';

class GetSavedArticles extends Component {
    state = {
        favoriteSavedArticles: []
    }

    deleteArticle = (e) => {
        const article_id = e.target.getAttribute("article_id");
        fetch("/api/saved",
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    article_id: article_id
                })
            })
            .then(res => res.json())
            .then(deletedArticle => {
                console.log(deletedArticle);
                //Updaate the state of the articles we setup:
                this.setState(
                    // Set the state with the current values returned from the database or the api
                    { deletedArticle }, () => {
                        // Append to the dom
                        this.getSavedArticles();
                    }
                )
            }
            );
    };
    // Get all saved articles
    getSavedArticles = e => {
        console.log("getSavedArticles Clicked")
        fetch("/api/saved")
            .then(res => res.json())
            .then(favoriteSavedArticles => {
                // Updaate the state of the articles we setup:
                this.setState(
                    // Set the state with the current values returned from the database or the api
                    { favoriteSavedArticles }
                )
            }
        );
    };

    render() {
        return (
            <ShowSavedArticles 
                favoriteSavedArticles={this.state.favoriteSavedArticles} 
                getSavedArticles={this.getSavedArticles} 
                deleteArticle={this.deleteArticle}
            />
        ) 
    }
}
export default GetSavedArticles;