#!/usr/bin/env node

var util = require('util');
var format = util.format;
var errorhandler = require('errorhandler');
var _ = require('underscore');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var winston = require("winston");
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

var level = config.logLevel || 'info';
var transports;
if (config.logDir) {
  transports = [
    new (winston.transports.File)({ filename: config.logDir + '/server.log' }),
  ];
}
else {
  transports = [
    new (winston.transports.Console)({colorize: true}),
  ];
}

var logger = new winston.Logger({
  level: level,
  transports: transports,
});

app.use(bodyParser.json());

var enabledPlugins = [];
var initPlugins = function(config) {
  logger.info('initializing plugins');
  for (var i in config.enabledPlugins) {
    var plugin = config.enabledPlugins[i];
    logger.info(format('trying to load plugin: %s', plugin));
    try {
      enabledPlugins[plugin] = require(format('./plugin/%s', plugin))(config, logger);
      logger.info(format('successfully loaded plugin: %s', plugin));
    }
    catch (e) {
      logger.error(format('could not load plugin %s: ', plugin, e));
    }
  }
}

initPlugins(config);

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
    if (!_.isArray(events)) {
      events = [events];
    };
    for (var key in events) {
      var event = events[key];
      for (var plugin in enabledPlugins) {
        logger.debug(format('sending event to plugin %s', plugin), event);
        enabledPlugins[plugin].handleEvent(event);
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

logger.info(format("Server listening on port %d", config.port));
http.createServer(app).listen(config.port);

