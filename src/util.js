/*
 * Utility functions.
 */
define('util', [], function() {

  function extend(target) {
    var sources = [].slice.call(arguments, 1);

    sources.forEach((source) => {
      for (var propertyName in source) {
        target[propertyName] = source[propertyName];
      }
    });
    return target;
  }

  return {
    extend
  };
});