import { SharedData, WrapperItems } from "./types";

const getFirstWrapper = (wrapperItems: WrapperItems) => {
  if (wrapperItems.size === 0) {
    throw new Error("no wrapped items!");
  }

  const values = wrapperItems.values();

  return values.next();
};

const getWrapper = (wrapperItems: WrapperItems, wrapperId: string): SharedData<any, any> => {
  const wrapper = wrapperItems.get(wrapperId);

  if (!wrapper) {
    throw new Error(`no wrapper items id: ${wrapperId}, wrapperItems size: ${wrapperItems.size}`);
  }

  return wrapper;
};

const generateId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export {
  getFirstWrapper,
  generateId,
  getWrapper
}
