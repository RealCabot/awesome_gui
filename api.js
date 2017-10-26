const PORT_NAME = 'COM14'

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const port = new SerialPort(PORT_NAME, function (err) {
    if (err) {
      return console.log('Error: ', err.message);
    }
  });

port.pipe(parser);

function readSensors(callBack){
    parser.on('data', callBack)
}

function setMotors(configs){
    function encode({BrushedSpeed, BrushedPos, ServoPos, StepperPos}){
        return `s${BrushedPos?BrushedPos:0}d${BrushedSpeed?BrushedSpeed:0}b${ServoPos?ServoPos:0}s${StepperPos?StepperPos:0}p`;
        //return BrushedSpeed;
    }
    console.log("Setting motor")
    port.write(encode(configs), function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
}

function setPIDParams(params){
    function encode({kp, ki, kd}){
        return `p${kp},${ki},${kd}`;
    }
    port.write(encode(params), function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log(`message written: ${encode(params)}`);
    })
}

module.exports = {setMotors, readSensors, setPIDParams};
