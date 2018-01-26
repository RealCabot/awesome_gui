import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import sender from './sender.js'

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

class DirectSpeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 0,
            angle: 0
        };
        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
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
        sender.sendCmd(parseFloat(this.state.speed), parseFloat(this.state.angle)/180*Math.PI);
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <form>
                    <TextField
                        name="speed"
                        label="Speed"
                        value={this.state.speed}
                        onChange={this.handleInputChange}
                        margin="normal"
                        className={classes.textField}
                    />
                    <TextField
                        name="angle"
                        label="Angle"
                        value={this.state.angle}
                        onChange={this.handleInputChange}
                        margin="normal"
                        className={classes.textField}
                    />
                    <Button raised color="primary" onClick={this.handleSend}>Go!</Button>
                </form>  
           </div>               
        );
    }
}

export default withStyles(styles)(DirectSpeed);