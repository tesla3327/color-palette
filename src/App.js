import React, { Component } from 'react';
import './App.scss';
import Color from 'color';

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
        readOnly
      />
    </div>
  </div>
);

const PropertyControl = ({ field, value, handleChange }) => (
  <div>
    <h2>{ field }</h2>
    <Slider
      field="Contrast"
      value={ value.contrast }
      range={{
        min: 0,
        max: 5.0,
        stepSize: 0.1,
      }}
      handleChange={ handleChange.bind(null, 'contrast') }
    />
    <Slider
      field="Shift"
      value={ value.shift }
      range={{
        min: -1,
        max: 1,
        stepSize: 0.05,
      }}
      handleChange={ handleChange.bind(null, 'shift') }
    />
  </div>
);

const darkShift = (color, lightness, saturation) =>
  Color(color)
    .saturate( saturation.contrast * saturation.value + saturation.shift )
    .darken( lightness.contrast * lightness.value - lightness.shift )
    .hex()
    .toString();

const lightShift = (color, lightness, saturation) =>
  Color(color)
    .desaturate( saturation.contrast * saturation.value - saturation.shift )
    .lighten( lightness.contrast * lightness.value + lightness.shift )
    .hex()
    .toString();

const renderColorPalette = (colorPalette, lightText, darkText) => (
  <div className="colors">
    {
      colorPalette.map( (e, i) => {
        const background = Color(e);
        const lightContrast = background.contrast(Color(lightText));
        const darkContrast = background.contrast(Color(darkText));

        let color;
        if (lightContrast > darkContrast) {
          color = lightText;
        } else {
          color = darkText;
        }

        return (
          <div
            key={i}
            style={{ background: e, color }}>
            { e }
          </div>
        );
      })
    }
  </div>
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      baseColor: '#d72516',
      palette: [],
      lightness: {
        contrast: 1.0,
        shift: 0,
      },
      saturation: {
        contrast: 1.0,
        shift: 0,
      },
      lightText: 'white',
      darkText: 'black',
    };

    this.state.palette = this.generateColorPalette();
    
    this.state.lightText = this.state.palette[5];
    this.state.darkText = this.state.palette[3];
  }

  shouldRegenerateColorPalette() {
    const { baseColor, lightness, saturation } = this.state;
    let validColor = false;

    try {
      const color = Color(baseColor);
      validColor = true;
    }
    catch (e) {
      validColor = false;
    }

    return validColor &&
      lightness.contrast !== '' &&
      lightness.shift !== '' &&
      saturation.contrast !== '' &&
      saturation.shift !== '';
  }

  generateColorPalette (state = this.state) {
    const regenerate = this.shouldRegenerateColorPalette();
    if (!regenerate) {
      return state.palette;
    } else {
      const { baseColor, lightness, saturation } = state;

      return [
        baseColor,
        darkShift(
          baseColor,
          { ...lightness, value: 0.1 },
          { ...saturation, value: 0.05 },
        ),
        darkShift(
          baseColor,
          { ...lightness, value: 0.2 },
          { ...saturation, value: 0.1 },
        ),
        darkShift(
          baseColor,
          { ...lightness, value: 0.3 },
          { ...saturation, value: 0.15 },
        ),
        lightShift(
          baseColor,
          { ...lightness, value: 0.3 },
          { ...saturation, value: 0.2 },
        ),
        lightShift(
          baseColor,
          { ...lightness, value: 0.5 },
          { ...saturation, value: 0.4 },
        ),
      ];
    }
  }

  handleSliderChange(field, prop, val) {
    const state = this.state;
    state[field][prop] = parseFloat(val);

    state.palette = this.generateColorPalette(state);

    state.lightText = state.palette[5];
    state.darkText = state.palette[3];

    this.setState(state);
  }

  handleBaseColorChange(e) {
    const state = this.state;
    state.baseColor = e.target.value;

    state.palette = this.generateColorPalette(state);

    state.lightText = state.palette[5];
    state.darkText = state.palette[3];

    this.setState(state);
  }

  render() {
    const { baseColor, lightness, saturation, palette, darkText, lightText } = this.state;

    return (
      <div className="App">
        
        { renderColorPalette( palette, lightText, darkText ) }
        
        <div id="sidebar" style={{ color: darkText }}>
          <h1>Color Palette</h1>

          <div className="base-color">
            <label>Base Color</label>
            <input
              value={ baseColor }
              onChange={ this.handleBaseColorChange.bind(this) }
            />
          </div>

          <PropertyControl
            field="Lightness"
            value={ lightness }
            handleChange={ this.handleSliderChange.bind(this, 'lightness') }
          />

          <PropertyControl
            field="Saturation"
            value={ saturation }
            handleChange={ this.handleSliderChange.bind(this, 'saturation') }
          />

        </div>
      </div>
    );
  }
}

export default App;
