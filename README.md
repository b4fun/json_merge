# `json_merge`

## usage

```javascript
import { resolveMerge } from '@b4fun/json_merge';

console.log(resolveMerge({
  $merge: [
    { foo: 'foo' },
    { bar: 'bar' },
  ],
}));
// { foo: 'foo', bar: 'bar' }
```

## license

MIT
