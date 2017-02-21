var config = {};

// Port to listen on.
config.port = 8085;

// Full path to file for storing received events.
// Leave empty to write to console.
config.output_file = '/path/to/file';

config.json = {};
// Number of spaces to use when pretty-printing JSON to file.
// Set to null for no pretty-printing.
config.json.spaces = 2;

/***** END *****/
// Following lines are always needed.
var module = module || {};
module.exports = config;

// vi: ft=javascript
