/*
 * Utility functions.
 */

function extend(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown> {
  sources.forEach(source => {
    for (const propertyName in source) {
      target[propertyName] = source[propertyName];
    }
  });
  return target;
}

function endsWith(str: string, suffix: string): boolean {
  return str.substr(str.length - suffix.length, str.length) === suffix;
}

function isDefined(value: unknown): boolean {
  return (typeof value !== 'undefined') && (value !== null);
}

export { extend, endsWith, isDefined };
