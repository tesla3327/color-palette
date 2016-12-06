import React, { Component } from 'react';
import './App.scss';

const vars = [
  '$base-color',
  '$darker',
  '$darkest',
  '$nearblack',
  '$lighter',
  '$lightest',
];

const App = () => (
  <div className="App">
    {
      vars.map( e => (<div>{ `${e}: ` }</div>))
    }
  </div>
);

export default App;
