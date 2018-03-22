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

class TunePID extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kp_L: '',
            ki_L: '',
            kd_L: '',
            kp_R: '',
            ki_R: '',
            kd_R: ''
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
        sender.sendPID(
            parseFloat(this.state.kp_L),
            parseFloat(this.state.ki_L),
            parseFloat(this.state.kd_L),
            parseFloat(this.state.kp_R),
            parseFloat(this.state.ki_R),
            parseFloat(this.state.kd_R),
        );
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid item xs={12} className={classes.root}>
                <Paper elevation={4} className={classes.paper}>
                    <Typography type="headline" component="h3">
                        PID Tuner
                    </Typography>
                    <form>
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="kp_L"
                                    label="Left kp"
                                    value={this.state.kp_L}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="ki_L"
                                    label="Left ki"
                                    value={this.state.ki_L}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="kd_L"
                                    label="Left kd"
                                    value={this.state.kd_L}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="kp_R"
                                    label="Right kp"
                                    value={this.state.kp_R}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="ki_R"
                                    label="Right ki"
                                    value={this.state.ki_R}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="kd_R"
                                    label="Right kd"
                                    value={this.state.kd_R}
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

export default withStyles(styles)(TunePID);