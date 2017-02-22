# Overview

This server follows a dead simple plugin workflow: received events are passed
directly to one or more configured plugins, which handle the processing of the
event.

Setup process for [Janus](https://github.com/meetecho/janus-gateway) can be
found [here](http://www.meetecho.com/blog/event-handlers-a-practical-example).

## Installation
 - ```npm install```
 - ```cp src/config.sample.js src/config.js```, edit to taste
 - ```node src/server.js```

## Configuration

See the [sample config](src/config.sample.js) for all configuration options.

## Plugins

Currently implemented plugins are:

 - **console**: Write events to console.
 - **file**: Write events to a file (currently only supports JSON format).

### Using plugins

 - Enable the plugin by adding it to the ```config.enabledPlugins``` array in
   the configuration file
 - Set any appropriate config options for the plugin, eg.
   ```config.plugin.file.outputFile = '/tmp/foo';```
   Configuration options for a plugin will be under the
   ```config.plugin.[name of plugin]``` section of the configuration file

### Writing plugins

A plugin must export a function which returns an object with one method, ```handleEvent```.

The function receives two arguments:

 - **config**: The server configuration object.
 - **logger**: The server logging instance, should you wish to use it for logging
           purposes.

The [console plugin](src/plugin/console.js) provides the most simple example
of the implementation.
