import React, { Component } from 'react';
import nipplejs from 'nipplejs';
import ROSLIB from 'roslib';

const SPEED_LIMIT = 0.7;

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
        this.cmdTopic = new ROSLIB.Topic({
            ros : this.state.ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
          });
    }
    componentDidMount(){
        this.manager.on('move', (e, stick)=>{
            // Set the maximum force to be 2
            const speed = Math.min(stick.force, 2) / 2 * SPEED_LIMIT;
            const angle = stick.angle.radian;
            const twist = new ROSLIB.Message({
                linear : {
                  x : speed,
                  y : 0,
                  z : 0
                },
                angular : {
                  x : 0,
                  y : 0,
                  z : angle - Math.PI /2
                }
              });
              this.cmdTopic.publish(twist);
        })
        this.manager.on('end', ()=>{
            const twist = new ROSLIB.Message({
                linear : {
                  x : 0,
                  y : 0,
                  z : 0
                },
                angular : {
                  x : 0,
                  y : 0,
                  z : 0
                }
              });
            this.cmdTopic.publish(twist);
        })
    }
    render(){
        const divStyle = {
            position: 'relative',
            height:'400px',
            width:'100%',
            backgroundColor:'#d2d2d2'
        }
        var renderJoy = function(element){
            const combinedOptions = Object.assign({zone: element}, this.joyOptions)
            this.manager = nipplejs.create(combinedOptions);
        }
        renderJoy = renderJoy.bind(this);

        return <div ref={renderJoy} style={divStyle}></div>
    }
}

export default JoyStick;