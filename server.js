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

exApp.get('/getusers', function(req, res){
  res.send(io.sockets.adapter.rooms);
});

io.on('connection', function(socket){
  io.emit('user.joined', {id: socket.id, name: socket.id});

  socket.on('msg.send', function(data){
    io.emit('msg.recvd', data);
  });

  socket.on('disconnect', function(){
//    socket.broadcast.emit('user.left', socket.id);
    io.emit('user.left', socket.id);
  });
});

/* RUN IT */
const PORT_NO = process.env.PORT_NO || 2000;
//exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });
server.listen(PORT_NO);

