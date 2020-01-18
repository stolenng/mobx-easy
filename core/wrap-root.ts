import { WrapperItems } from "../common/types";
import { generateId } from "../common/utils";

const wrapRoot = (wrapperItems: WrapperItems) => {
  return <E>(RootStore: any, env: E) => {
    const id = generateId();
    let root;

    if (!env) {
      throw new Error("No environment was passed!");
    }

    const instance = new RootStore();

    if (!instance.init || typeof instance.init !== "function") {
      throw new Error("Root Store must have init function!");
    }

    root = instance;

    wrapperItems.set(id, {
      environmentData: env,
      root
    });
    instance.init();

    return {
      instance,
      id
    };
  };
};

export {
  wrapRoot
};
