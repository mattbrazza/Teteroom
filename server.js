/* REQUIREMENTS */
const express = require('express');
const bodyParser = require('body-parser');
const exApp = express();

/* CONFIGURATION */
const config = require('./config.js'); config.setConfigs();
exApp.use(bodyParser.json());

/* ROUTING */
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


/* RUN IT */
const PORT_NO = process.env.PORT_NO || 2000;
exApp.listen(PORT_NO, () => { console.log('LISTENING ON ', PORT_NO); });

