import React, { Component } from 'react';
import JoyStick from 'react-joystick';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import sender from './sender.js';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    })
});

const joyOptions = {
    mode: 'semi',
    catchDistance: 150,
    color: 'white'
}

const containerStyle = {
    position: 'relative',
    height: '350px',
    width: '100%',
    background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

const SPEED_LIMIT = 0.5;

class JoyWrapper extends Component {
    constructor() {
        super();
        this.managerListener = this.managerListener.bind(this);
    }

    managerListener(manager) {
        manager.on('move', (e, stick) => {
            // Set the maximum force to be 2
            const speed = Math.min(stick.force, 4) / 4 * SPEED_LIMIT;
            const angle = stick.angle.radian;
            sender.sendCmd(speed, (angle - Math.PI / 2) / 3);
        })
        manager.on('end', () => {
            sender.sendCmd(0, 0);
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={4} className={classes.root}>
                <Paper elevation={4} className={classes.paper}>
                    <JoyStick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(JoyWrapper);