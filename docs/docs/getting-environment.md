---
id: getting-environment
title: Getting the Environment
sidebar_label: Getting the Environment
---
After wrapping the root in the previous step, you can now inject the environment to all of your stores inside the root you wrapped.

# getEnv

Lets take the `SomeStore`, and add it `getEnv` from `mobx-easy`.

```
import {getEnv} from 'mobx-easy;

Class SomeStore {
     constructor() {
        const env = getEnv();
        env.amazingService.doSomething();
    }
}
```
`getEnv` accepts a string, if you passed a name to the wrapper.

# @addEnv 

Lets take the `SomeStore`, and add it `addEnv` decorator from `mobx-easy`.
The decorator extends the class and adds it a method called `getEnv` which returns our environment object we passed in `wrapRoot`.

```
import {addEnv} from 'mobx-easy;

@addEnv
Class SomeStore {
     constructor() {
        const env = getEnv();
        env.amazingService.doSomething();
    }
}
``` 

# @addEnvByName
Same, but with a name passed for people using multiple root stores.
```
import {addEnvByName} from 'mobx-easy;

@addEnvByName("SomeName")
Class SomeStore {
     constructor() {
        const env = getEnv();
        env.amazingService.doSomething();
    }
}
``` 
