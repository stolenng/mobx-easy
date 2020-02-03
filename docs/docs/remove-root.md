---
id: remove-root
title: Remove Root
sidebar_label: Removing The Root
---

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
