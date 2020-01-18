import { SharedData } from "./common/types";
import { wrapRoot as wrapRootInit } from "./core/wrap-root";
import { addEnvironment as addEnvironmentInit, addEnvironmentById as addEnvironmentByIdInit } from "./core/add-environment";
import { addRoot as addRootInit, addRootById as addRootByIdInit } from "./core/add-root";

const wrappedItems = new Map<string, SharedData<any, any>>();

const wrapRoot = wrapRootInit(wrappedItems);
const addEnvironment = addEnvironmentInit(wrappedItems);
const addEnvironmentById = addEnvironmentByIdInit(wrappedItems);
const addRoot = addRootInit(wrappedItems);
const addRootById = addRootByIdInit(wrappedItems);
const setter = addRootByIdInit(wrappedItems);

export {addActions} from "./core/add-actions"
export {addComputations} from "./core/add-computations"
export {setter} from "./core/setter"
export {revertible} from "./core/revertible"

export {
  wrapRoot,
  addEnvironment,
  addEnvironmentById,
  addRoot,
  addRootByIdInit
}
