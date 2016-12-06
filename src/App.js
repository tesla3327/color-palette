import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          $base-color
        </div>
        <div>
          $darker
        </div>
        <div>
          $darkest
        </div>
        <div>
          $nearblack
        </div>
        <div>
          $lighter
        </div>
        <div>
          $lightest
        </div>
      </div>
    );
  }
}

export default App;
