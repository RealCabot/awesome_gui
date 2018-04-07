import ROSLIB from 'roslib'
import Quaternion from 'quaternion'
import responsiveVoice from './vendor/responsiveVoice'

// const ROS_BRIDGE_URL = 'ws://192.168.1.109:9090'
const ROS_BRIDGE_URL = 'ws://localhost:9090'

class Sender {
    constructor(){
        this.ros = new ROSLIB.Ros({
            // in order to use it in your phone
            // url : 'ws://192.168.1.109:9090'
            url : ROS_BRIDGE_URL
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

        this.moveBaseClient = new ROSLIB.ActionClient({
            ros : this.ros,
            serverName : '/move_base',
            actionName : 'move_base_msgs/MoveBaseAction'
          });

        this.pidLTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/tunePID_L',
            messageType: 'geometry_msgs/Vector3'
        })

        this.pidRTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/tunePID_R',
            messageType: 'geometry_msgs/Vector3'
        })

        this.resetArduinoTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/reset_arduino',
            messageType: 'std_msgs/Bool'
        })

        this.sayTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: '/say',
            messageType: 'std_msgs/String'
        })

        this.sayTopic.subscribe(sentence => responsiveVoice.speak(sentence.data))
    }

    sendCmd(speed, angle){
        console.log(speed)
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

    sendPID(kp_L, ki_L, kd_L, kp_R, ki_R, kd_R){
        const params_L = new ROSLIB.Message({
            x: kp_L,
            y: ki_L,
            z: kd_L
        });
        const params_R = new ROSLIB.Message({
            x: kp_R,
            y: ki_R,
            z: kd_R
        });
        this.pidLTopic.publish(params_L);
        this.pidRTopic.publish(params_R);
    }

    sendGoal(x, y, angle){

        var currentTime = new Date();
        var secs = Math.floor(currentTime.getTime()/1000);
        var nsecs = Math.round(1000000000*(currentTime.getTime()/1000-secs));

        const q = Quaternion.fromEuler(angle, 0, 0, 'ZXY');
        const q_vec = q.toVector();

        const goal = new ROSLIB.Goal({
            actionClient : this.moveBaseClient,
            goalMessage : {
                target_pose : {
                    header: {
                        frame_id: "base_link",
                        stamp: {
                            secs: secs,
                            nsecs: nsecs
                        }
                    },
                    pose: {
                        position: {
                            x: x,
                            y: y,
                            z: 0
                        },
                        orientation: {
                            x: q_vec[1],
                            y: q_vec[2],
                            z: q_vec[3],
                            w: q_vec[0]
                        }
                    }
                }
            }
          });
        
          goal.on('result', function(result) {
            responsiveVoice.speak("Congratulations! You reached your destination");
          });
        
          goal.send();
    }

    resetArduino(){
        this.resetArduinoTopic.publish(new ROSLIB.Message({
            data: true
        }))
    }

    
}

const sender = new Sender();

export default sender;