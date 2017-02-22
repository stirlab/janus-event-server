module.exports = function(config, logger) {
  var handleEvent = function(event) {
    logger.debug('[CONSOLE]: received event');
    console.log(event);
  }
  return {
    handleEvent: handleEvent,
  }
}
