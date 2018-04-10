import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import './App.css';
import CommandCenter from './CommandCenter';
import JoyWrapper from './JoyWrapper';
import DestinationSelector from './DestinationSelector'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';import ChatIcon from 'material-ui-icons/Chat';
import OpenWithIcon from 'material-ui-icons/OpenWith';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import Button from 'material-ui/Button';
import sender from './sender.js';

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
      value: 'commander',
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event, value){
    this.setState({ value });
  };

  reset(){
    sender.reset();
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className="App">
        <div className={classes.navbar}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab label="Commander" value="commander" icon={<ChatIcon />} />
              <Tab label="Joystick" value="joystick" icon={<OpenWithIcon />} />
              <Tab label="Destination" value="destination" icon={<LocationOnIcon />} />
            </Tabs>
          </AppBar>
        </div>
        {value === 'commander' && <CommandCenter/>}
        {value === 'joystick' && <JoyWrapper/>}
        {value === 'destination' && <DestinationSelector/>}
        <Button variant="fab" color="secondary" aria-label="reset" size='large' className={classes.reset} onClick={this.reset}>
          Do not press
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(App);
