import React, { Component } from 'react';
import Jumbotron from './Components/Jumbotron';
import Articles from './Components/articles/get-articles';

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <Articles />
      </div>
    );
  }
}

export default App;
