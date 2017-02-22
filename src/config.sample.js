var module = module || {};
var config = {};
module.exports = config;

/////////////////////////
// SERVER CONFIG
/////////////////////////

// Port to listen on.
config.port = 8085;

// Path to server logging directory, leave unset to log to console.
// NOTE: This directory must already by created and writable by the node
// process!
//config.logDir = '/path/to/log/directory';
// Server logging level, default is 'info'.
// See https://github.com/winstonjs/winston#logging-levels for all available
// levels.
//config.logLevel = 'info';

// Add any plugin that you wish to receive events here.
config.enabledPlugins = [
  'console',
  //'file',
];

/////////////////////////
// PLUGIN CONFIG
/////////////////////////

/**
 * See each particular plugin for descriptions of settings.
 */

config.plugin = {};

// Console plugin.
config.plugin.console = {};

// File plugin.
config.plugin.file = {};
config.plugin.file.outputFile = '/path/to/file';
config.plugin.file.outputFormat = 'json';
config.plugin.file.spacing = null;

// vi: ft=javascript
