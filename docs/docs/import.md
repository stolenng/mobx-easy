---
id: import
title: Imports
---
Remember to import from :
```
import {wrapRoot} from 'mobx-easy';
```

and not :
```
import {wrapRoot} from 'mobx-easy/dist/core/wrap-root';
```
it won't work with imports like this.
