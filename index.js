var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
const {setMotors, readSensors, setPIDParams} = require('./api.js');

server.listen(8000);

app.use(express.static('build'))

app.get('/', function (req, res) {
    res.sendfile(path.resolve(__dirname, 'build/index.html'));
  });

io.on('connection', (client) => {
    console.log("Client connected")
    client.on('setMotor', configs=>{
        setMotors(configs)
    })
    client.on('setPIDParams', params=>{
        setPIDParams(params);
    })
});

readSensors(str=>{
    console.log(str);
    if (str.startsWith('69:')){
        io.emit('sensorData', {
            ultrasonic: parseFloat(/\d*\.?\d+(?=s)/.exec(str)[0]),
            infrad: parseFloat(/\d*\.?\d+(?=i)/.exec(str)[0]),
            pot: parseFloat(/\d*\.?\d+(?=p)/.exec(str)[0]),
            force: parseFloat(/\d*\.?\d+(?=f)/.exec(str)[0])
        })
    }
    if (str.startsWith('pid:')){
        io.emit('pidData', {
            input: parseFloat(/\d*\.?\d+(?=i)/.exec(str)[0]),
            control: parseFloat(/\d*\.?\d+(?=c)/.exec(str)[0]),
        })
    }
})