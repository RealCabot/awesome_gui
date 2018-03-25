import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import logo from './img/motor.svg';
import './App.css';
import CommandCenter from './CommandCenter';
import JoyWrapper from './JoyWrapper';
import DestinationSelector from './DestinationSelector'
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ChatIcon from 'material-ui-icons/Chat';
import OpenWithIcon from 'material-ui-icons/OpenWith';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(){
    super();
    this.state = {
      value: "commander",
    };
  }

  handleChange(event, value){
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <header className="App-header" style={{position:'relative'}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Cabot GUI</h1>
        </header>
        <CommandCenter></CommandCenter>
        <Grid container spacing={24} justify="center">
          <JoyWrapper></JoyWrapper>
          <DestinationSelector></DestinationSelector>
        </Grid>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels >
          {/* <BottomNavigationAction label="Commander" value="commander" icon={<ChatIcon />} />
          <BottomNavigationAction label="Joystick" value="joystick" icon={<OpenWithIcon />} />
          <BottomNavigationAction label="Destination" value="destination" icon={<LocationOnIcon />} /> */}
        </BottomNavigation>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default App;
