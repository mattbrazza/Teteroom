/* REQUIREMENTS */
const express = require('express');
const bodyParser = require('body-parser');
const exApp = express();
// SOCKET.IO STUFF
const server = require('http').Server(exApp);
const io = require('socket.io')(server);

/* CONFIGURATION */
const config = require('./config.js'); config.setConfigs();
exApp.use(bodyParser.json());
exApp.use(express.static(__dirname + '/'));

/* ROUTING */
exApp.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('newMsg', function(data){
    console.log('Data server-rec: ', data);
    socket.emit('msg', data);           // for ourselves
    socket.broadcast.emit('msg', data); // for others
  });
});

/* RUN IT */
const PORT_NO = process.env.PORT_NO || 2000;
//exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });
server.listen(PORT_NO);

