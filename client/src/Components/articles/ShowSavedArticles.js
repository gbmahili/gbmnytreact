import React, { Component } from 'react';

class ShowSavedArticles extends Component {

    constructor(props) {
        super(props);
    }
    
    
    render() {
        return (
            <li>
                <div className="collapsible-header blue-grey lighten-4">
                    <i className="material-icons">save</i>Saved Articles
                            </div>
                <div className="collapsible-body">
                    <div className="row">
                        <a href="#!" onClick={this.props.getSavedArticles} className="btn">Retreive Saved Articles</a>
                    </div>
                    <div className="row">
                        <ul className="collection with-header card">
                            <li className="collection-header"><h4>List of saved articles</h4></li>
                            {/* Loop over results here */}

                            {
                                this.props.favoriteSavedArticles.map(article =>

                                    <li key={article._id} className="collection-item">
                                        <div>
                                            <a href={article.NewsArticleURL} target="_blank">{article.NewsTitle}</a>
                                            <a href="#!" className="secondary-content"><i article_id={article._id} onClick={this.deleteArticle} className="material-icons red-text">delete</i></a>
                                        </div>
                                    </li>
                                )
                            }
                            {/* End of loop */}
                        </ul>
                    </div>
                </div>
            </li>
        )

    }

}

export default ShowSavedArticles;