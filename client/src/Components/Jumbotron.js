import React, { Component } from 'react';

const jumbotronStyle = {
    paddingBottom: '20px',
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"
}

class Jumbotron extends Component {
    render() {
        return (
            <div className="card-panel cyan lighten-2 white-text" style={jumbotronStyle}>
                <div className="container">
                    <h4>GBMahili <br/>The New York Times Article Search</h4>
                    <p>This will help you search the New York Time Database for articles in a given data range!</p>
                </div>
            </div>
        );
    }
}

export default Jumbotron;