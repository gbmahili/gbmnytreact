import React from "react";

class SearchResults extends React.Component {
    render() {
        return(
            <div className="row">
                {
                    this.props.articles.map((article, i) =>
                        <div key={i} className="col s12 m10 offset-m1">
                            <div className="card horizontal">
                                <div className="card-image">
                                    {(() => {
                                        if (article.multimedia[0] === undefined) {
                                            // If there is no URL, RETURN A SPLASH NEWS PICTURE
                                            return (
                                                <div className="card-content">
                                                    <img alt={this.props.alt} src="The_New_York_Times_logo.png" />
                                                    <span className="noImageFound">Baraka Mahili's Message: 'Sorry, this article does not have an image in the NYT API results!'</span>
                                                </div>
                                            );
                                        } else {
                                            // Else, return the Article's url
                                            return (<img alt={this.props.alt} src={"https://static01.nyt.com/" + article.multimedia[0].url} />);
                                        }
                                    })()}
                                </div>
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <span className="card-title">{article.headline.main}</span> <br />
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
                                            onClick={this.props.saveArticle}
                                        >Save</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )//End of .map()
                }
            </div>
        )
    }
}

export default SearchResults;