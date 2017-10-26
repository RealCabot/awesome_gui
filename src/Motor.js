import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import { setMotors, setPIDParams } from './api.js';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  });

class Motor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BrushedSpeed: '',
            BrushedPos: '',
            ServoPos: '',
            StepperPos: '',
            kp:0,
            ki:0,
            kd:0
        };
        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleSetPID = this.handleSetPID.bind(this);
    }
    
    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSend(){
        setMotors(this.state);
    }
    handleSetPID(){
        setPIDParams(this.state);
    }
    render() {
        const { classes } = this.props;
        return(
            <div>
                <form>
                <TextField
                    name="BrushedSpeed"
                    label="Brushed Motor Speed"
                    value={this.state.BrushedSpeed}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <TextField
                    name="BrushedPos"
                    label="Brushed Motor Position"
                    value={this.state.BrushedPos}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <TextField
                    name="ServoPos"
                    label="Servo Position"
                    value={this.state.ServoPos}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <TextField
                    name="StepperPos"
                    label="Stepping Motor Position"
                    value={this.state.StepperPos}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <Button raised color="primary" onClick={this.handleSend}>Go!</Button>
                </form>  
                <form>
                <TextField
                    name="kp"
                    label="kp"
                    value={this.state.kp}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <TextField
                    name="ki"
                    label="ki"
                    value={this.state.ki}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <TextField
                    name="kd"
                    label="kd"
                    value={this.state.kd}
                    onChange={this.handleInputChange}
                    margin="normal"
                    className={classes.textField}
                />
                <Button raised color="primary" onClick={this.handleSetPID}>Go!</Button>
                </form>  
           </div>               
        );
    }
}

export default withStyles(styles)(Motor);