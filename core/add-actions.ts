import { Constructor } from "../common/types";
import {action as mobxAction} from "mobx";

const addActions = (actionsFetcher: (self) => object) => {
  return function <T extends Constructor>(BaseClass: T) {
    return class extends BaseClass {
      constructor(...args: any[]) {
        super(...args);

        const actions = actionsFetcher(this);

        for (let action in actions) {
          this[action] = mobxAction(actions[action]);
        }
      }
    };
  };
};

export {
  addActions
}
