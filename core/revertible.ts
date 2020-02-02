import {Constructor} from "../common/types";
import {action, observe} from "mobx";
import {logPrefix} from "../common/utils";

type Change = {
  name: string;
  object: any;
  type: "update";
  oldValue: any;
  newValue: any;
}

const ActionName = 'revert';
const ActionDisposerName = 'disposeRevertObserver';

const revertible = (propsToWatch: string[]) => {
  if (!propsToWatch || propsToWatch.length === 0) {
    throw new Error(`${logPrefix} Please provide an array of properties to watch`);
  }

  return function <T extends Constructor>(BaseClass: T) {
    const startWatch = (self: any) => {
      const prevState: Map<string, any> = new Map<string, any>();

      const disposer = observe(self, change => {
        const {name, oldValue} = change as Change;

        prevState.set(name, oldValue);
      });

      return {
        prevState,
        disposer
      };
    };

    const revert = (self: any, prevState: Map<string, any>) => {
      return action((key: string) => {
        if (!key) {
          prevState.forEach((value, key) => {
            self[key] = value;
          });

          prevState.clear();
        } else {
          const oldValue = prevState.get(key);
          self[key] = oldValue;
          prevState.delete(key);
        }
      });
    }


    return class extends BaseClass {
      constructor(...args: any[]) {
        super(...args);

        const {prevState, disposer} = startWatch(this);
        this[ActionName] = revert(this, prevState)
        this[ActionDisposerName] = disposer;
      }
    };
  };
}

export {
  revertible
}
