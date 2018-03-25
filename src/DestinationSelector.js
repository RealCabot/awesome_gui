import React, { Component } from 'react';
import JoyStick from 'react-joystick';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import sender from './sender.js';
import destinations from './data/destinations.json'
import responsiveVoice from './vendor/responsiveVoice'

const CROSS_CIRCLE_THRESHOLD = 2 * Math.PI - 1;
const DESTINATIONS_GAP_ANGLE = Math.PI / 3;

const synth = window.speechSynthesis;

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

const divStyle = {
    position: 'relative',
    height: '350px',
    width: '100%',
    background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

class DestinationSelector extends Component {
    constructor() {
        super();
        this.managerFn = this.managerFn.bind(this);
        this.accumulated_round = 0;
        this.prev_angle = null;
        this.prev_index = -1;
        this.state = {
            destination: 'Destination Selected'
        }
    }

    angleToIndex(angle) {
        const index =  Math.floor(angle / DESTINATIONS_GAP_ANGLE);
        if (index < 0){
            return 0;
        } else if (index >=destinations.length){
            return destinations.length-1;
        } else {
            return index;
        }
    }

    managerFn(manager) {
        manager.on('move', (e, stick) => {
            const angle = stick.angle.radian;
            if (this.prev_angle){
                if (this.prev_angle - angle > CROSS_CIRCLE_THRESHOLD ){
                    this.accumulated_round += 1;
                } else if (this.prev_angle - angle < -CROSS_CIRCLE_THRESHOLD ){
                    this.accumulated_round -= 1;
                }
            }
            const real_angle = this.accumulated_round * 2 * Math.PI + angle;
            console.log(real_angle);
            const index = this.angleToIndex(real_angle);
            if (index !== this.prev_index){
                console.log(index, destinations[index]);
                responsiveVoice.speak(destinations[index]);
                this.setState({
                    destination: destinations[index]
                })
            }
            this.prev_index = index
            this.prev_angle = angle;
            
        })
        manager.on('end', () => {
            this.accumulated_round = 0;
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={4} className={classes.root}>
                <Typography variant="headline" component="h3">
                {this.state.destination}
                </Typography>
                <Paper elevation={4} className={classes.paper}>
                    <JoyStick joyOptions={joyOptions} divStyle={divStyle} managerFn={this.managerFn} />
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(DestinationSelector);