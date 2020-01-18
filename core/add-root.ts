import { Constructor, WrapperItems } from "../common/types";
import {getFirstWrapper, getWrapper} from "../common/utils";

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
          return getWrapper(wrapperItems, wrapperId).root;
        }
      };
    };
  };
};

export {
  addRoot,
  addRootById
};
