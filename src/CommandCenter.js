import React, { Component } from 'react';
import sender from './sender.js';
import SimpleForm from './SimpleForm';
import Grid from 'material-ui/Grid';

class CommandCenter extends Component {
    render() {
        return (
            <Grid container spacing={24} justify="center">
                <SimpleForm title='Direct Speed' fields={directSpeed_fields} handleSend={directSpeed_handleSend}/>
                <SimpleForm title='Set Goal' fields={goal_fields} handleSend={goal_handleSend}/>
                <SimpleForm title='Tune PID' fields={pid_fields} handleSend={pid_handleSend}/>
            </Grid>
        );
    }
}

const directSpeed_fields = [
    {
      name: 'linear',
      label: 'Linear Speed'
    },
    {
      name: 'angular',
      label: 'Angular Speed'
    },
    {
      name: 'latch',
      label: 'Latch'
    },
]

const goal_fields = [
    {
        name: 'x',
        label: 'x'
    },
    {
        name: 'y',
        label: 'y'
    },
    {
        name: 'theta',
        label: 'theta'
    },
]

const pid_fields = [
    {
      name: 'kp_l',
      label: 'Left Kp'
    },
    {
      name: 'ki_l',
      label: 'Left Ki'
    },
    {
      name: 'kd_l',
      label: 'Left Kd'
    },
    {
      name: 'kp_r',
      label: 'Right Kp'
    },
    {
      name: 'ki_r',
      label: 'Right Ki'
    },
    {
      name: 'kd_r',
      label: 'Right Kd'
    },
]

function goal_handleSend(state){
    sender.sendGoal(
        parseFloat(state.x), 
        parseFloat(state.y), 
        parseFloat(state.theta)
    )
}

function directSpeed_handleSend(state){
    sender.sendCmd(parseFloat(state.linear), parseFloat(state.angular));
    if (state.latch){
        setTimeout(()=>{
            sender.sendCmd(0,0);
        }, parseFloat(state.latch)*1000)
    }
}

function pid_handleSend(state){
    sender.sendPID(
        parseFloat(state.kp_L),
        parseFloat(state.ki_L),
        parseFloat(state.kd_L),
        parseFloat(state.kp_R),
        parseFloat(state.ki_R),
        parseFloat(state.kd_R),
    );
}

export default CommandCenter;