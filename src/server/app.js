const express = require('express')
const app = express()
const local_ip = require('my-local-ip')();

app.get('/local_ip', (req, res) => res.send(local_ip))

app.listen(3001, () => console.log('Server running on 3001!'))