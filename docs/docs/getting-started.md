---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Installation

The library requires MobX, to install simply run this command:
```
npm i mobx-easy
```

## Wrapping The Root
So in order to start using the library you will need to do 2 things:
  * wrap the root instance of you application
  * add init function to the root instance
  
For example:
```
import {wrapRoot} from 'mobx-easy';

Class RootStore {
    init() {
        this.store1 = new Store1();
        this.store2 = new Store2();
    }
}

const env = {
    someService: {},
    someFlag: false
};

const rootStore = wrapRoot({
    RootStore: RootStore,
    env:  env,
    wrapperName?: "SomeName" // optional
})
```

And then you're ready to use `addRoot|addRootByName|getRoot` and `addEnvironment|addEnvironmentByName|getEnv`

## wrapRoot

wrapRoot receives options object with this interface: 
```
interface WrapRootOptions<E, R> {
  RootStore: new () => R; // Class Instance
  env: E; // Any Environment object you like
  wrapperName?: string; // Optional Name for multiple wrapping
}
```

`RootStore` - Should receives a Class with init function, why ? so we can initialize the class and only then init all other class so we can inject it.
<br>
`env` - Object that will hold the environment for this wrapped root, you can pass what ever you like here and then use it in all of root store context and stores.
<br>
`wrapperName` - For Application which have multiple rootStore, you can pass any name you like and then when using the library functions you just pass the name and you get corresponding root instance or environment object.
