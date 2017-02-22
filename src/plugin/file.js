/**
 * File plugin.
 *
 * Writes all events to the specified file.
 *
 * The plugin automatically appends a newline to the output string.
 *
 * Config options:
 *   outputFile: Full path to the file to write the events to.
 *   outputFormat: Format to output the event data in. Currently only 'json'.
 *   spacing: Number of spaces to use for pretty-printing, if unset
 *            pretty-printing is disabled. Not all output formats support this
 *            setting.
 */

var util = require('util');
var format = util.format;
var fs = require('fs');
module.exports = function(config, logger) {
  var conf = config.plugin.file || {};
  var outputFormat = conf.outputFormat || 'json';
  var outputJson = function(event) {
    var output = JSON.stringify(event, null, conf.spacing);
    return output;
  }
  var handleEvent = function(event) {
    logger.debug('[FILE]: received event');
    var resultFunc = function(err) {
      if (err) {
        logger.error(format('could not write to %s, %s', conf.outputFile, err));
      }
    }
    var output;
    switch (outputFormat) {
      case 'json':
        output = outputJson(event);
        break;
      default:
        logger.error(format('unsupported output format %s', outputFormat));
    }
    // The extra newline allows for one JSON string per line.
    fs.appendFile(conf.outputFile, output + "\n", resultFunc);
  }
  return {
    handleEvent: handleEvent,
  }
}

