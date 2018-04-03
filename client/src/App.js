import React, { Component } from 'react';
import Jumbotron from './Components/Jumbotron';
import Main from './Components/Layout/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <Main />
      </div>
    );
  }
}

export default App;
