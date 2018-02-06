import React, { Component } from 'react';
import nipplejs from 'nipplejs';
import sender from './sender.js';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const SPEED_LIMIT = 0.5;

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

class JoyStick extends Component {
    constructor(props) {
        super(props);
        this.joyOptions = {
            mode: 'semi',
            catchDistance: 150,
            color: 'white'
        }
        this.state = {
            ros: this.props.ros
        }
    }
    componentDidMount(){
        this.manager.on('move', (e, stick)=>{
            // Set the maximum force to be 2
            const speed = Math.min(stick.force, 4) / 4 * SPEED_LIMIT;
            const angle = stick.angle.radian;
            sender.sendCmd(speed, (angle - Math.PI /2)/3);
        })
        this.manager.on('end', ()=>{
            sender.sendCmd(0, 0);
        })
    }
    render(){
        const { classes } = this.props;
        const divStyle = {
            position: 'relative',
            height:'200px',
            width:'100%',
            background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        }
        var renderJoy = function(element){
            const combinedOptions = Object.assign({zone: element}, this.joyOptions)
            this.manager = nipplejs.create(combinedOptions);
        }
        renderJoy = renderJoy.bind(this);

        return (
        <Grid item xs={12} sm={4} className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
                <div ref={renderJoy} style={divStyle}>
                </div>
            </Paper>
        </Grid>
        )
    }
}

export default withStyles(styles)(JoyStick);