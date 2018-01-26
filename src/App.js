import React, { Component } from 'react';
import logo from './img/motor.svg';
import './App.css';
import JoyStick from './JoyStick.js'
import ROSLIB from 'roslib';

class App extends Component {
  constructor(props){
    super(props);

    this.ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    this.ros.on('connection', function() {
      console.log('Connected to websocket server.');
    });
  
    this.ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });
  
    this.ros.on('close', function() {
      console.log('Connection to websocket server closed.');
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{position:'relative'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cabot GUI</h1>
        </header>
        <JoyStick ros={this.ros}></JoyStick>
      </div>
    );
  }
}

export default App;
