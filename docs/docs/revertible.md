---
id: revertible
title: Revertible
sidebar_label: @revertible
---

# @revertible
For cases like optimistic UI updates, when you want to show the client a change has happened but maybe you need to revert the situation if we fail to save change in the server.
 
```
import {revertible} from 'mobx-easy';

@revertible(['name', 'lastName'])
class TestClass {
    @observable
    name: string = 'oldName';
    @observable
    lastName: string = 'oldLastName';
}

const intance = new TestClass();

instance.lastName = 'newLastName';

instance.revert('lastName');

instance.lastName; // 'oldLastName'

instance.name = 'newName';
instance.lastName = 'newLastName';

instance.revert(); 

instance.name; // 'oldName'
instance.lastName; // 'oldLastName'

```

`revertible` - adds `revert` function to the class, call `revert()` to revert all properties, or call `revert(propertyName)` for specific property.
