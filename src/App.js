import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import logo from './img/motor.svg';
import './App.css';
import JoyStick from './JoyStick'
import DirectSpeed from './DirectSpeed';
import CommandCenter from './CommandCenter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{position:'relative'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cabot GUI</h1>
        </header>
        <Grid container spacing={24} justify="center">
        <DirectSpeed></DirectSpeed>
        <CommandCenter></CommandCenter>
        <JoyStick></JoyStick>
        </Grid>
      </div>
    );
  }
}

export default App;
