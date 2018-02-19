import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
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
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
      })
  });

class DirectSpeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: '',
            angular: '',
            latch: ''
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
        sender.sendCmd(parseFloat(this.state.speed), parseFloat(this.state.angular));
        setTimeout(()=>{
            sender.sendCmd(0,0);
        }, parseFloat(this.state.latch)*1000)
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid item xs={12} sm={4} className={classes.root}>
                <Paper elevation={4} className={classes.paper}>
                    <Typography type="headline" component="h3">
                        Direct Speed Control
                    </Typography>
                    <form>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <TextField
                                    name="speed"
                                    label="Linear Velocity"
                                    value={this.state.speed}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="angular"
                                    label="Anglar Velocity"
                                    value={this.state.angular}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="latch"
                                    label="Latch"
                                    value={this.state.latch}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button raised color="primary" onClick={this.handleSend}>Go!</Button>
                            </Grid>
                        </Grid>
                    </form> 
                </Paper> 
            </Grid>
        );
    }
}

export default withStyles(styles)(DirectSpeed);