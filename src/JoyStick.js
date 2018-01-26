import React, { Component } from 'react';
import nipplejs from 'nipplejs';
import sender from './sender.js'

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
    }
    componentDidMount(){
        this.manager.on('move', (e, stick)=>{
            // Set the maximum force to be 2
            const speed = Math.min(stick.force, 2) / 2 * SPEED_LIMIT;
            const angle = stick.angle.radian;
            sender.sendCmd(speed, angle - Math.PI /2);
        })
        this.manager.on('end', ()=>{
            sender.sendCmd(0, 0);
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