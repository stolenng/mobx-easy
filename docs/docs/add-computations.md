---
id: add-computations
title: Adding Computation
sidebar_label: @addComputations
---
Ever had too big mobx class ? 
<br>
Wanted to start composing computed values ?

## @addComputations

Example on how you can utilize this decorator to have separate files for computations and keep you project a bit cleaner :) 

```
    //computation-less.computations.ts
    export const computations = (self: ComputationLess) => ({
        fullName: () => {
            return `${self.firstName}_${self.lastName}`
        }
    });

    import {addComputations} from 'mobx-easy';
    import {computations} from './computation-less.computations';

    @addComputations(computations)
    class ComputationLess {
        @observable
        firstName: string = firstName;
        @observable
        lastName: string = lastName;

        constructor(firstName: string, lastName: String) {
             this.firstName = firstName;
             this.lastName = lastName
        }
    }

    const instance = new ComputationLess('Add', 'Computations');

    instance.fullName; // 'Add Computations'
```
`addComputations` - Decorator which receives a function with object self which is the class/store you are extending as `self`.
<br>



