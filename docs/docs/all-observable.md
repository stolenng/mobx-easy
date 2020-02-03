---
id: all-observable
title: All Observable
sidebar_label: @allObservable
---
Let's image we have a class with 60 properties, instead of writing for each `@observable` 60 times we can just do this:

## @allObservable

```
    import {allObservable} from 'mobx-easy';

     type HugeType {
       userId: number;
       id: number;
       title: string;
       completed: boolean;
       justSomeProp: number;
       someName: number;
       lastName: string;
       firstName: boolean;
     }

    @allObservable(["id"])
    class Test {
        constructor(hugeType: HugeType) {
            Object.assign(this, hugeType);
        }
    }
```

`allObservable` - decorators which receives array of properties to exclude, not mandatory.

