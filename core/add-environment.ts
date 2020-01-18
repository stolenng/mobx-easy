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

const addEnvironmentById = (wrapperItems: WrapperItems) => {
  return (wrapperId?: string) => {
    return <T extends Constructor>(BaseClass: T) => {
      return class extends BaseClass {
        getEnv() {
          return getWrapper(wrapperItems, wrapperId).environmentData;
        };
      };
    };
  };
};

export {
  addEnvironment,
  addEnvironmentById
};
