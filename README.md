# mobx-easy
mobx-easy is simple library that makes your day to day mobx usage easier and adds some extra abilities.

Full Docs here: http://mobx-easy.georgy-glezer.com/
<br>
Examples: https://github.com/stolenng/mobx-easy-examples 

# Intro

The idea for library came after a while using MobX and understanding i need some extra abilities,
Checking out MobX-State-Tree and understanding i don't want to lose MobX simplicity i got.
<br>
<br>
So i decided to write this libraries and try to get out the maximum of MobX while keeping it simple :)

Article about it: https://levelup.gitconnected.com/introducing-mobx-easy-cd281ace9e6e.

## Getting Started
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
  rootStoreConstructorParams?: RCP; // params to constructor function
  rootStoreInitParams?: RIP; // params to init function
  assignIdsToClasses?: boolean; // let mobx-easy assign its own ids to the classes by the field `mobx_easy_id`
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

## Getting The Root

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

# removeRoot
For people who want to remove the root wrapped, can be useful when you need to remove the root on application destroy or mount or unmount of application component. 
```
import {removeRoot} from 'mobx-easy';

componentWillUnmount() {
    removeRoot();
    
    removeRoot("wrapperName"); // by name
}
```

`removeRoot` - will remove single root or specific one by name.

