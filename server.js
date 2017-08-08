/* REQUIREMENTS */
const express = require('express');
const bodyParser = require('body-parser');
const exApp = express();

/* CONFIGURATION */
const config = require('./config.js'); config.setConfigs();

/* ROUTING */
exApp.get('/', function(req, res){
  res.status(200, 'Hello World');
});

exApp.post('/', function(req, res){
  res.status(200, 'Successful POSTing');
});


/* RUN IT */
const PORT_NO = process.env.PORT_NO || 2000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });

