import React from "react";
import SearchForm from "./api/SearchForm";
import SearchResults from './api/ShowSearchResults';

class Search extends React.Component {
    state = {
        articles: [],
        searchTerm: "",
        dateFrom: "",
        dateTo: ""
    }
    // Functions
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    // Function to get articles from the NYT API
    loadAllArticles = (e) => {
        e.preventDefault();
        fetch("/api/saved",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchTerm: this.state.searchTerm,
                    dateFrom: this.state.dateFrom,
                    dateTo: this.state.dateTo
                })
            })
            .then(res => res.json())
            .then(articles => {
                // Updaate the state of the articles we setup:
                this.setState(
                    // Set the state with the current values returned from the database or the api
                    { articles: articles.response.docs }
                )
            }
            );

    };

    // Save An Article
    saveArticle = (e) => {
        e.preventDefault();

        const article_url = e.target.getAttribute("article_url");
        const article_title = e.target.getAttribute("article_title");
        const published_date = e.target.getAttribute("published_date").slice(0, -5) + "Z";

        fetch("/api/keepArticle",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    articleName: article_title,
                    articleURL: article_url,
                    publishedDate: published_date
                })
            })
            .then(res => res.json())
            .then(savedArticles => {
                // Updaate the state of the articles we setup:
                this.setState(
                    // Set the state with the current values returned from the database or the api
                    { savedArticles }, () => {
                        console.log(savedArticles);
                        if (savedArticles.code === 11000) {
                            alert("Article Already Saved!")
                            //return (Materialize.toast('That article is already saved!', 4000))
                        } else {
                            //return (Materialize.toast('Article Saved!', 4000))
                            alert("Article Saved!");
                        }

                    }
                )
            }
            );
    };

    render(){
        return(
            <li>
                <div className="collapsible-header blue white-text lighten-2">
                    <i className="material-icons">search</i>Search for Articles
                </div>
                <div className="collapsible-body">
                    <SearchForm
                        searchTerm={this.state.searchTerm}
                        dateFrom={this.state.dateFrom}
                        dateTo={this.state.dateTo}
                        handleInputChange={this.handleInputChange}
                        loadAllArticles={this.loadAllArticles}
                    />
                    <SearchResults
                        articles={this.state.articles}
                        saveArticle={this.saveArticle}
                    />
                </div>
        </li>
        )
    }

}

export default Search;