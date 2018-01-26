import ROSLIB from 'roslib'

class Sender {
    constructor(){
        this.ros = new ROSLIB.Ros({
            url : 'ws://localhost:9090'
        });
        
        this.ros.on('connection', function() {
            console.log('Connected to websocket server.');
        });
    
        this.ros.on('error', function(error) {
            console.log('Error connecting to websocket server: ', error);
        });
    
        this.ros.on('close', function() {
            console.log('Connection to websocket server closed.');
        });
        this.cmdTopic = new ROSLIB.Topic({
            ros : this.ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
          });
    }
    sendCmd(speed, angle){
        const twist = new ROSLIB.Message({
            linear : {
              x : speed,
              y : 0,
              z : 0
            },
            angular : {
              x : 0,
              y : 0,
              z : angle
            }
          });
          this.cmdTopic.publish(twist);
    }
}

const sender = new Sender();

export default sender;