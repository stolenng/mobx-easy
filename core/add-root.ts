import { Constructor, WrapperItems } from "../common/types";
import { getFirstWrapper } from "../common/utils";

const addRoot = (wrapperItems: WrapperItems) => {
  return <T extends Constructor>(BaseClass: T) => {
    return class extends BaseClass {
      getRoot() {
        return getFirstWrapper(wrapperItems).value.root;
      }
    };
  };
};

const addRootById = (wrapperItems: WrapperItems) => {
  return (wrapperId: string) => {
    return <T extends Constructor>(BaseClass: T) => {
      return class extends BaseClass {
        getRoot() {
          return wrapperItems.get(wrapperId).root;
        }
      };
    };
  };
};

export {
  addRoot,
  addRootById
};
