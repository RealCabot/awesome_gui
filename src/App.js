import React, { Component } from 'react';
import logo from './img/motor.svg';
import './App.css';
import Motor from './Motor.js';
import Plotter from './Plotter.js'
import Particles from 'react-particles-js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{position:'relative'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Motor and Sensor Panel</h1>
          <Particles
          params={{
              particles: {
                  number: {
                      value: 30
                  },
                  line_linked: {
                      shadow: {
                          enable: false,
                          color: "#3CA9D1",
                          blur: 5
                      }
                  }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab"
                  },
                  onclick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true
                }
              }
          }}
          style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
          }}
        />
        </header>
        <Motor/>
        <Plotter/>
      </div>
    );
  }
}

export default App;
