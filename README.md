# helpers

Helpers for comparing and checking routes.


## API

_route can be a route name (string) or state object containing a name property_

- __startsWithSegment(route, segment)__
- __endsWithSegment(route, segment)__
- __includesSegment(route, segment)__


### All functions are available in their curried form

- __startsWithSegment(route)(segment)__
- __endsWithSegment(route)(segment)__
- __includesSegment(route)(segment)__

```
import * as helpers from 'router5.helpers';

startsWithSegment('users', 'users');      // => true
startsWithSegment('users.list', 'users'); // => true

startsWithSegment('users.list')('users'); // => true
```
