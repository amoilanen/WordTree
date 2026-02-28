import { extend, endsWith, isDefined } from '../src/util';

describe('extend', function() {

  let target: Record<string, unknown>;

  beforeEach(function() {
    target = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };
  });

  it('should leave one target unchanged', function() {
    expect(extend(target)).toEqual(target);
  });

  it('should extend target with one source', function() {
    expect(extend(target, {
      key3: 'value3other',
      key4: 'value4'
    })).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3other',
      key4: 'value4'
    });
  });

  it('should extend target with several sources', function() {
    expect(extend(target, {
      key3: 'value3other',
      key4: 'value4',
      key5: 'value5'
    }, {
      key5: 'value5other',
      key6: 'value6',
    })).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3other',
      key4: 'value4',
      key5: 'value5other',
      key6: 'value6'
    });
  });
});

describe('endsWith', function() {

  it('should return true if starts with', function() {
    expect(endsWith('abcde', 'cde')).toBe(true);
  });

  it('should return true if does not start with', function() {
    expect(endsWith('abcde', 'bcd')).toBe(false);
  });
});

describe('isDefined', function() {

  it('should pass the check when value', function() {
    expect(isDefined(5)).toBe(true);
  });

  it('should not pass the check when null', function() {
    expect(isDefined(null)).toBe(false);
  });

  it('should not pass the check when undefined', function() {
    expect(isDefined(undefined)).toBe(false);
  });
});
