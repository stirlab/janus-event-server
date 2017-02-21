#!/usr/bin/env node

var util = require('util');
var format = util.format;
var errorhandler = require('errorhandler');
var _ = require('underscore');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var winston = require("winston");
var fs = require('fs');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
  }));
  //app.use(morgan('dev'));
}

var level;
var transports;
if (process.env.NODE_ENV === "production") {
  //var logDir = config.logDir || __dirname;
  //level = 'info';
  //transports = [
  //  new (winston.transports.File)({ filename: logDir + '/server.log' }),
  //];
  level = 'debug';
  transports = [
    new (winston.transports.Console)({colorize: true}),
  ];
}
else {
  level = 'debug';
  transports = [
    new (winston.transports.Console)({colorize: true}),
  ];
}

var logger = new winston.Logger({
  level: level,
  transports: transports,
});

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Janus events server, this page does nothing, Janus must POST to /event');
});

app.get('/monitor/', function(req, res) {
  logger.debug('Got monitor request');
  res.send('up');
});

app.post('/event', function (req, res) {
  try {
    var events = req.body;
    for (key in events) {
      var event = events[key];
      if (_.isEmpty(config.output_file)) {
        console.log(event);
      }
      else {
        var output = JSON.stringify(event, null, config.json.spaces);
        var resultFunc = function(err) {
          if (err) {
            logger.error(format('could not write to %s, %s', config.output_file, err));
          }
        }
        // The extra newline allows for one JSON string per line.
        fs.appendFile(config.output_file, output + "\n", resultFunc);
      }
    }
    var status = 200;
    res.status(status).end(http.STATUS_CODES[status]);
  }
  catch (e) {
    logger.error(e);
    res.status(500).send(String(e));
  }
});

logger.debug(format("Server listening on port %d", config.port));
http.createServer(app).listen(config.port);

