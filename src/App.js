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

const Slider = ({ field, range, value, handleChange }) => (
  <div className="slider">
    <label>{ field }</label>
    <div>
      <div className="control">
        <span>{ range.min }</span>
        <input
          type="range"
          min={ range.min }
          max={ range.max }
          step={ range.stepSize }
          value={ value }
          onChange={ (e) => handleChange(e.target.value) }
        />
        <span>{ range.max }</span>
      </div>
      <input
        value={ value }
        onChange={ (e) => handleChange(e.target.value) }
      />
    </div>
  </div>
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      lightness: {
        contrast: 1.0,
        shift: 0,
      },
      saturation: {
        contrast: 1.0,
        shift: 0,
      },
    };
  }
  render() {
    const that = this;

    return (
      <div className="App">
        <div className="colors">
          {
            vars.map( e => (<div key={e}>{ `${e}:` }</div>))
          }
        </div>
        <div id="sidebar">
          <h1>Color Palette</h1>

          <div className="base-color">
            <label>Base Color</label>
            <input />
          </div>

          <h2>Lightness</h2>
          <Slider
            field="Contrast"
            value={ this.state.lightness.contrast }
            range={{
              min: 0,
              max: 2.0,
              stepSize: 0.1,
            }}
            handleChange={ (val) => that.setState({ lightness: { contrast: val } }) }
          />
          <Slider
            field="Shift"
            value={ this.state.lightness.shift }
            range={{
              min: -20,
              max: 20,
              stepSize: 1,
            }}
            handleChange={ (val) => that.setState({ lightness: { shift: val } }) }
          />

          <h2>Saturation</h2>
          <Slider
            field="Contrast"
            value={ this.state.saturation.contrast }
            range={{
              min: 0,
              max: 2.0,
              stepSize: 0.1,
            }}
            handleChange={ (val) => that.setState({ saturation: { contrast: val } }) }
          />
          <Slider
            field="Shift"
            value={ this.state.saturation.shift }
            range={{
              min: -20,
              max: 20,
              stepSize: 1,
            }}
            handleChange={ (val) => that.setState({ saturation: { shift: val } }) }
          />
        </div>
      </div>
    );
  }
}

export default App;
