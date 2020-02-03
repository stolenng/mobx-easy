import { Constructor, WrapperItems } from "../common/types";
import { getFirstWrapper, getWrapper } from "../common/utils";

const addEnvironment = (wrapperItems: WrapperItems) => {
  return <T extends Constructor>(BaseClass: T) => {
    return class extends BaseClass {
      getEnv() {
        return getFirstWrapper(wrapperItems).value.environmentData;
      };
    };
  };
};

const addEnvironmentByName = (wrapperItems: WrapperItems) => {
  return (wrapperName: string) => {
    return <T extends Constructor>(BaseClass: T) => {
      return class extends BaseClass {
        getEnv() {
          return getWrapper(wrapperItems, wrapperName).environmentData;
        };
      };
    };
  };
};

const getEnv = (wrapperItems: WrapperItems) => {
  return <T>(wrapperName?: string): T => {
    if (wrapperName) {
      return getWrapper(wrapperItems, wrapperName).environmentData;
    } else {
      return getFirstWrapper(wrapperItems).value.environmentData;
    }
  }
};

export {
  getEnv,
  addEnvironment,
  addEnvironmentByName
};
