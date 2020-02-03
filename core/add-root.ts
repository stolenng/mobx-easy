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

const addRootByName = (wrapperItems: WrapperItems) => {
  return (wrapperName: string) => {
    return <T extends Constructor>(BaseClass: T) => {
      return class extends BaseClass {
        getRoot() {
          return getWrapper(wrapperItems, wrapperName).root;
        }
      };
    };
  };
};

const getRoot = (wrapperItems: WrapperItems) => {
  return <T>(wrapperName?: string): T => {
    if (wrapperName) {
      return getWrapper(wrapperItems, wrapperName).root;
    } else {
      return getFirstWrapper(wrapperItems).value.root;
    }
  }
};

export {
  getRoot,
  addRoot,
  addRootByName
};
