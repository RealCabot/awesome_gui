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

class CommandCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: '',
            y: '',
            theta: ''
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

    handleSend() {
        sender.sendGoal(parseFloat(this.state.x), parseFloat(this.state.y), parseFloat(this.state.theta))
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={4} className={classes.root}>
                <Paper elevation={4} className={classes.paper}>
                    <Typography type="headline" component="h3">
                        Command Center
                    </Typography>
                    <form>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <TextField
                                    name="x"
                                    label="X"
                                    value={this.state.x}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="y"
                                    label="Y"
                                    value={this.state.y}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    className={classes.textField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="theta"
                                    label="Theta"
                                    value={this.state.theta}
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

export default withStyles(styles)(CommandCenter);