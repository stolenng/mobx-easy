---
id: setter
title: Setter
sidebar_label: @setter
---

# @setter
How many times we declare simple property and then add useless action which just sets it ? with this we can save the time. 
```
import {setter} from 'mobx-easy';

class TestClass {
    @setter('setTestProp')
    @observable
    testProp: string = initialWord;

    @setter('setDefaultValue', 'defaultValue')
    @observable
    withDefaultValue: string = '';
}

const instance = new TestClass();

instance.setTestProp('something');

instance.testProp; // 'something'

instance.setDefaultValue();

instance.setDefaultValue();

instance.withDefaultvalue; // 'defaultValue'
```

`setter` - recieves `name` string and optional param `defaultValue`.
