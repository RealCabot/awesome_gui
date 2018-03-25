import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import logo from './img/motor.svg';
import './App.css';
import DirectSpeed from './DirectSpeed';
import CommandCenter from './CommandCenter';
import TunePID from './TunePID';
import JoyWrapper from './JoyWrapper';

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
        <JoyWrapper></JoyWrapper>
        <TunePID></TunePID> 
        </Grid>
      </div>
    );
  }
}

export default App;
