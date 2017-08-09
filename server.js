/* REQUIREMENTS */
const express = require('express');
const bodyParser = require('body-parser');
const exApp = express();
// const server = require('http').Server(exApp);
// const io = require('socket.io')(server);
// server.listen(80);

/* CONFIGURATION */
const config = require('./config.js'); config.setConfigs();
exApp.use(bodyParser.json());

/* ROUTING */
exApp.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.emit('news', {txt: 'hello world'});
  socket.on('other event', function(data){
    console.log(data);
  });
});


/*
exApp.get('/', function(req, res){
  res.status(200).send('Hello World\n');
});

exApp.post('/', function(req, res){
  let msg = req.body.message;
  if (!msg) {
    res.status(400).send('No message\n');
  } else {
    res.status(200).send('Successful POSTing\n');
  }
});
*/


/* RUN IT */
const PORT_NO = process.env.PORT_NO || 2000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });

