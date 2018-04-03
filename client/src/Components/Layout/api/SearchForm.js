import React from "react";

class SearchForm extends React.Component {
    render(){
        return(
            <div className="row">
                <form>
                    <div className="col s12 m3">
                        <input
                            value={this.props.searchTerm}
                            name="searchTerm"
                            type="text"
                            className="searchTerm"
                            placeholder="Search Term"
                            onChange={this.props.handleInputChange}
                        />
                    </div>
                    <div className="col s12 m3">
                        <input
                            value={this.props.dateFrom}
                            name="dateFrom"
                            type="date"
                            id="dateFrom"
                            className="datepickers"
                            placeholder="Date From"
                            onChange={this.props.handleInputChange}
                        />
                    </div>
                    <div className="col s12 m3">
                        <input
                            value={this.props.dateTo}
                            name="dateTo"
                            type="date"
                            id="dateTo"
                            className="datepickers"
                            placeholder="Date To"
                            onChange={this.props.handleInputChange}
                        />
                    </div>
                    <div className="col s12 m3">
                        <a className="btn btn-large cyan search-articles-button" onClick={this.props.loadAllArticles}><i className="material-icons left">search</i> Search</a>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchForm;