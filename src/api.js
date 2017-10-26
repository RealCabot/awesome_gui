import io from 'socket.io-client'; 

const socket = io();

function setMotors(configs){
    socket.emit('setMotor', configs);
}

function setPIDParams(params){
    socket.emit('setPIDParams', params);
    console.log("sent params")
}

function monitorSensors(callback){
    socket.on('sensorData', callback);
}

function monitorPID(callback){
    socket.on('pidData', callback)
}

export {setMotors, monitorSensors, monitorPID, setPIDParams}