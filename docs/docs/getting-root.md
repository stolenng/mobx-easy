---
id: getting-root
title: Getting the Root
sidebar_label: Getting the Root
---
After wrapping the root in the previous step, you can now inject the root instance to all of your stores inside the root you wrapped.
<br>
<br>
Why is useful? As a project grows and you have more and more stores, you start to write something like this:
```
Class RootStore {
    constructor(rootStore: RootStore) {
        this.someStore = new SomeStore(rootStore);
    }
}
Class SomeStore {
     constructor(rootStore: RootStore) {
        this.moreStore = new SomeStore(rootStore);
    }
}
``` 
and it can get infinite and you get the point....
So lets see the next tools :)

# getRoot

Lets take the `SomeStore`, and add it `getRoot` from `mobx-easy`.

```
import {getRoot} from 'mobx-easy;

Class SomeStore {
     constructor() {
        this.moreStore = new SomeStore(getRoot());
    }
}
```
`getRoot` accepts a string, if you passed a name to the wrapper.

# @addRoot 

Lets take the `SomeStore`, and add it `addRoot` decorator from `mobx-easy`.
<br>
The decorator extends the class and adds it a method called `getRoot` which returns our root instance after it was wrapped.

```
import {addRoot} from 'mobx-easy;

@addRoot
Class SomeStore {
     constructor() {
        this.moreStore = new SomeStore(this.getRoot());
    }
}
``` 

# @addRootByName
Same, but with a name passed for people using multiple root stores.
```
import {addRootByName} from 'mobx-easy;

@addRootByName("wrapperName")
Class SomeStore {
     constructor() {
        this.moreStore = new SomeStore(this.getRoot());
    }
}
``` 

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
