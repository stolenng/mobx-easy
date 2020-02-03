---
id: typescript
title: Typescript + Decorators Compatibility
---

Because typescript runs at compile time, and decorators are being added at runtime, currently it doesn't know how to support extending class functionality through decorators.

Here is a workaround to this:
```
import {addRoot} from 'mobx-easy';

interface SomeClass {
    getRoot: () => RootStore;
}

@addRoot
class SomeClass {
   doSomething() {
        const root = this.getRoot():
    }
}
```

By declaring the interface we let typescript compiler to know about the extended method through decorators.
