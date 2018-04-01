import React, { Component } from 'react';
// import ShowSavedArticles from "./ShowSavedArticles";

class Articles extends Component {
    constructor() {
        super();

        this.state = {
            articles: [],
            deletedArticle: [],
            savedArticles: [],
            favoriteSavedArticles: [],
            searchTerm: "",
            dateFrom : "",
            dateTo : ""
        }
    }

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
        const published_date = e.target.getAttribute("published_date").slice(0, -5)+"Z";

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
                    { savedArticles}, () => {
                        console.log(savedArticles);
                        if(savedArticles.code === 11000) {
                            alert("Article Already Saved!")
                            //return (Materialize.toast('That article is already saved!', 4000))
                        }else{
                            //return (Materialize.toast('Article Saved!', 4000))
                            alert("Article Saved!");
                        }
                        
                    }
                )
            }
        );
    };
    // Delete Article
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
            <div>

                <div>

                    <ul className="collapsible" data-collapsible="accordion">
                        {/* Article Search Section */}                        
                        <li>
                            <div className="collapsible-header blue white-text lighten-2">
                                <i className="material-icons">search</i>Search for Articles
                            </div>

                            <div className="collapsible-body">
                                {/* Search Form */}
                                <div className="row">
                                    <form>
                                        <div className="col s12 m3">
                                            <input
                                                value={this.state.searchTerm}
                                                name="searchTerm" 
                                                type="text" 
                                                className="searchTerm" 
                                                placeholder="Search Term" 
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        
                                        <div className="col s12 m3">
                                            <input 
                                                value={this.state.dateFrom}
                                                name="dateFrom" 
                                                type="date"
                                                id="dateFrom"
                                                className="datepickers" 
                                                placeholder="Date From" 
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col s12 m3">
                                            <input
                                                value={this.state.dateTo}
                                                name="dateTo" 
                                                type="date" 
                                                id="dateTo"
                                                className="datepickers" 
                                                placeholder="Date To" 
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                        <div className="col s12 m3">
                                            <a className="btn btn-large cyan search-articles-button" onClick={this.loadAllArticles}><i className="material-icons left">search</i> Search</a>
                                        </div>
                                    </form>
                                </div>

                                {/* Retrieved Articels */}
                                <div className="row">
                                    {this.state.articles.error}
                                    {
                                        this.state.articles.map((article, i) =>

                                            <div key={i} className="col s12 m10 offset-m1">
                                                <div className="card horizontal">
                                                    <div className="card-image">                                                            
                                                            {(() => {
                                                            if (article.multimedia[0] === undefined){
                                                                // If there is no URL, RETURN A SPLASH NEWS PICTURE
                                                                return (
                                                                    <div className="card-content">
                                                                        <img alt={this.props.alt} src="The_New_York_Times_logo.png" />
                                                                        <span className="noImageFound">Baraka Mahili's Message: 'Sorry, this article does not have an image in the NYT API results!'</span>
                                                                    </div>
                                                                
                                                                );
                                                            }else{
                                                                // Else, return the Article's url
                                                                return(<img alt={this.props.alt} src={"https://static01.nyt.com/" + article.multimedia[0].url} />);
                                                            }
                                                            })()}
                                                    </div>
                                                    <div className="card-stacked">
                                                        <div className="card-content">
                                                            <span className="card-title">{article.headline.main}</span> <br/>                                                            
                                                            <p>
                                                                {article.snippet}
                                                            </p>
                                                            <span className="published-date">Published on {article.pub_date}</span>
                                                        </div>
                                                        <div className="card-action">
                                                            <a href={article.web_url} target="_blank">Read</a>
                                                            <a 
                                                                href="#!" 
                                                                article_url={article.web_url} 
                                                                article_title={article.headline.main} 
                                                                published_date={article.pub_date} 
                                                                onClick={this.saveArticle}
                                                            >Save</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )//End of .map()
                                    }
                                </div>
                            </div>
                        </li>

                        {/* <ShowSavedArticles /> */}

                        <li>
                            <div className="collapsible-header blue-grey lighten-4">
                                <i className="material-icons">save</i>Saved Articles
                            </div>
                            <div className="collapsible-body">
                                <div className="row">
                                    <a href="#!" onClick={this.getSavedArticles} className="btn">Retreive Saved Articles</a>
                                </div>
                                <div className="row">
                                    <ul className="collection with-header card">
                                        <li className="collection-header"><h4>List of saved articles</h4></li>
                                        

                                        {
                                           this.state.favoriteSavedArticles.map(article =>
                                                
                                                <li key={article._id} className="collection-item">
                                                    <div>
                                                        <a href={article.NewsArticleURL} target="_blank">{article.NewsTitle}</a>
                                                        <a href="#!" className="secondary-content"><i article_id={article._id} onClick={this.deleteArticle} className="material-icons red-text">delete</i></a>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        
                                    </ul>
                                </div>
                            </div>
                        </li>


                    </ul>
                </div>
            </div>//End of main div to return
        );
    }
}

export default Articles;
