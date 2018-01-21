const {
  isMergeObject,
  resolveMerge,
} = require('..');

test('isMergeObject', () => {
  expect(isMergeObject(1)).toBe(false);
  expect(isMergeObject('foo')).toBe(false);
  expect(isMergeObject(['foo'])).toBe(false);
  expect(isMergeObject({})).toBe(false);
  expect(isMergeObject({ $merge: 'foo' })).toBe(false);
  expect(isMergeObject({ $merge: {} })).toBe(false);
  expect(isMergeObject({ $merge: ['foo'] })).toBe(true);
});

describe('resolveMerge', () => {
  test('non merge object', () => {
    expect(resolveMerge(1)).toBe(1);
    expect(resolveMerge('foo')).toBe('foo');
    expect(resolveMerge({})).toEqual({});
    expect(resolveMerge({ $merge: {} })).toEqual({ $merge: {} });
  });

  test('empty merge', () => {
    expect(resolveMerge({ $merge: [] })).toEqual({});
  });

  test('merge into object', () => {
    expect(resolveMerge({
      $merge: [
        { foo: 'foo' },
        { bar: 'bar' },
      ],
    })).toEqual({
      foo: 'foo',
      bar: 'bar',
    });
  });

  test('merge with key collision', () => {
    expect(resolveMerge({
      $merge: [
        { foo: 'foo' },
        { foo: 'bar' },
      ],
    })).toEqual({
      foo: 'bar',
    });
  });

  test('merge with non-object children', () => {
    expect(resolveMerge({
      $merge: [
        { foo: 'foo' },
        1,
        false,
      ],
    })).toEqual({
      foo: 'foo',
    });
  });
});
