---
id: add-actions
title: Adding Actions
sidebar_label: @addActions
---
Ever had too big mobx class ? 
<br>
Wanted to start composing actions ?

## @addActions

Example on how you can utilize this decorator to have separate files for actions and keep you project a bit cleaner :) 

```
    //action-less.actions.ts
    export const actions = (self: ActionLess) => ({
       addEntity: (entity) => self.entities.push(entity),
       removeEntity: () => self.entities.pop(),
       updateTime: () => self.time = time
   });

    import {addActions} from 'mobx-easy';
    import {actions} from './action-less.actions';

    @addActions(actions)
    class ActionLess {
        @observable
        entities: any[] = []
        @observable
        time: number = Date.now()
    }

    const instance = new ActionLess();

    instance.addEntity({id: 5, name: 'test'}); 
    instance.updateTime();
    instance.removeEntity();
```
`addActions` - Decorator which receives a function with object self which is the class/store you are extending as `self`.
<br>



