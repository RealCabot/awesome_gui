import React, { Component } from 'react';
import logo from './img/motor.svg';
import './App.css';
import JoyStick from './JoyStick'
import DirectSpeed from './DirectSpeed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{position:'relative'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cabot GUI</h1>
        </header>
        <JoyStick></JoyStick>
        <DirectSpeed></DirectSpeed>
      </div>
    );
  }
}

export default App;
