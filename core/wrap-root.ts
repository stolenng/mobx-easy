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

    const instance: R = new RootStore();

    if (initFunctionDoesntExists(instance)) {
      throw new Error(`${logPrefix} root store must have init function!`);
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
