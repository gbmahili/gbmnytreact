import React, { Component } from 'react';
import ShowSavedArticles from './ShowSavedArticles';

class GetSavedArticles extends Component {
    state = {
        favoriteSavedArticles: []
    }

    // Get all saved articles
    getSavedArticles = e => {
        fetch("/api/saved")
            .then(res => res.json())
            .then(favoriteSavedArticles => {
                // Updaate the state of the articles we setup:
                this.setState(
                    // Set the state with the current values returned from the database or the api
                    { favoriteSavedArticles }, () => {
                        // Append to the dom
                        console.log(favoriteSavedArticles);
                    }
                )
            }
        );
    }

    render() {

        return (
            <ShowSavedArticles favoriteSavedArticles={this.state.favoriteSavedArticles} getSavedArticles={this.getSavedArticles} />
        ) // return        
    } //render
} //Component

export default GetSavedArticles;