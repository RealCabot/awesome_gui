import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import './App.css';
import CommandCenter from './CommandCenter';
import JoyWrapper from './JoyWrapper';
import DestinationSelector from './DestinationSelector'
import ResetButton from './ResetButton'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';import ChatIcon from '@material-ui/icons/Chat';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import NavigationIcon from '@material-ui/icons/Navigation';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Nav2d from 'react-nav2djs';
import sender from './sender';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6effff',
      main: '#00e5ff',
      dark: '#00b2cc',
      contrastText: '#37474f',
    },
    secondary: {
      light: '#fff64f',
      main: '#ffc400',
      dark: '#c79400',
      contrastText: '#f9f9f9',
    },
  },
});


const styles = theme => ({
  navbar: {
    flexGrow: 1
  },
  reset: {
    position: 'fixed',
    bottom: '1rem',
    right:'calc(50% - 56px)'
  }
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      value: 'commander'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value){
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className={classes.navbar}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} centered>
                <Tab label="Commander" value="commander" icon={<ChatIcon />} />
                <Tab label="Joystick" value="joystick" icon={<OpenWithIcon />} />
                <Tab label="Destination" value="destination" icon={<LocationOnIcon />} />
                <Tab label="Map" value="map" icon={<NavigationIcon />} />
              </Tabs>
            </AppBar>
          </div>
          {value === 'commander' && <CommandCenter/>}
          {value === 'joystick' && <JoyWrapper/>}
          {value === 'destination' && <DestinationSelector/>}
          {value === 'map' && <Nav2d ros={sender.ros}/>}
          <ResetButton/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
