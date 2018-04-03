import React, { Component } from 'react';
import Search from './Search';
import Saved from './Saved';
class Articles extends Component {
    constructor() {
        super();
        this.state = {
            deletedArticle: [],
            savedArticles: [],
            favoriteSavedArticles: []
        };
    };
    // Render Elements
    render() {
        return (
            <div>
                <div>
                    <ul className="collapsible" data-collapsible="accordion">
                        {/* Search Form and Search Results */}
                        <Search />
                        {/* Show Saved Articles */}
                        <Saved />
                    </ul>
                </div>
            </div>//End of main div to return
        );
    };
}
export default Articles;