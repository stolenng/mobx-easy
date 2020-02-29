import { WrapperItems } from "../common/types";
import {generateId, logPrefix} from "../common/utils";

export interface IInit {
  init: () => void;
}

export interface WrapRootOptions<E, R> {
  RootStore: new () => R;
  env: E;
  wrapperName?: string;
}

const wrapRoot = (wrapperItems: WrapperItems) => {
  return <R extends IInit, E>({RootStore, env, wrapperName}: WrapRootOptions<E, R>): R => {
    const id = generateId();

    if (!env) {
      throw new Error(`${logPrefix} no environment was passed!`);
    }

    let instance;

    try {
      instance = new RootStore();
    } catch(e) {
      instance = RootStore;
    }

    if (initFunctionDoesntExists(instance)) {
      throw new Error(`${logPrefix} root store must have init function!`);
    }

    if (wrapperName && wrapperItems.get(wrapperName)) {
      throw new Error(`${logPrefix} wrapper name already exists! please provide different name.`);
    }

    wrapperItems.set(wrapperName || id, {
      environmentData: env,
      root: instance
    });

    instance.init();

    return instance;
  };
};

const initFunctionDoesntExists = (instance) => !instance.init || typeof instance.init !== "function";

export {
  wrapRoot
};
