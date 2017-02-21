var config = {};

// Port to listen on.
config.port = 8085;

// Full path to file for storing received events.
// When not set, writes to console.
//config.output_file = '/path/to/file';

config.json = {};
// Number of spaces to use when pretty-printing JSON to file.
// Default is no pretty printing, one JSON string per line, which is easily
// consumed by something like MongoDB.
//config.json.spaces = null;

/***** END *****/
// Following lines are always needed.
var module = module || {};
module.exports = config;

// vi: ft=javascript
