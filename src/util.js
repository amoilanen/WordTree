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

  function endsWith(str, suffix) {
    return str.substr(str.length - suffix.length, str.length) === suffix;
  }

  function isDefined(value) {
    return (typeof value !== 'undefined') && (value !== null);
  }

  return {
    extend,
    endsWith,
    isDefined
  };
});