import ROSLIB from 'roslib'
import Quaternion from 'quaternion'

class Sender {
    constructor() {

        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
        const pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
        pc.createDataChannel('');//create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
        pc.onicecandidate = function (ice) {
            if (ice && ice.candidate && ice.candidate.candidate) {
                const localIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                
                this.ros = new ROSLIB.Ros({
                    // in order to use it in your phone
                    url: `ws://${localIP}:9090`
                    // url : 'ws://localhost:9090'
                });
        
                this.ros.on('connection', function () {
                    console.log('Connected to websocket server.');
                });
        
                this.ros.on('error', function (error) {
                    console.log('Error connecting to websocket server: ', error);
                });
        
                this.ros.on('close', function () {
                    console.log('Connection to websocket server closed.');
                });
                this.cmdTopic = new ROSLIB.Topic({
                    ros: this.ros,
                    name: '/cmd_vel',
                    messageType: 'geometry_msgs/Twist'
                });
                this.moveBaseClient = new ROSLIB.ActionClient({
                    ros: this.ros,
                    serverName: '/move_base',
                    actionName: 'move_base_msgs/MoveBaseAction'
                });
                
                pc.onicecandidate = noop;
            }
        }.bind(this);
    }

    sendCmd(speed, angle) {
        const twist = new ROSLIB.Message({
            linear: {
                x: speed,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: angle
            }
        });
        this.cmdTopic.publish(twist);
    }

    sendGoal(x, y, angle) {

        var currentTime = new Date();
        var secs = Math.floor(currentTime.getTime() / 1000);
        var nsecs = Math.round(1000000000 * (currentTime.getTime() / 1000 - secs));

        const q = Quaternion.fromEuler(angle, 0, 0, 'ZXY');
        const q_vec = q.toVector();

        const goal = new ROSLIB.Goal({
            actionClient: this.moveBaseClient,
            goalMessage: {
                target_pose: {
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

        goal.on('feedback', function (feedback) {
            console.log('Feedback: ' + feedback.sequence);
        });

        goal.on('result', function (result) {
            console.log('Final Result: ' + result.sequence);
        });

        goal.send();
    }
}

const sender = new Sender();

export default sender;