import { SharedData } from "./common/types";
import { wrapRoot as wrapRootInit } from "./core/wrap-root";
import { addEnvironment as addEnvironmentInit, addEnvironmentByName as addEnvironmentByNameInit, getEnv as getEnvInit } from "./core/add-environment";
import { addRoot as addRootInit, addRootByName as addRootByNameInit, getRoot as getRootInit } from "./core/add-root";
import { removeRoot as removeRootInit } from './core/remove-root';

const wrappedItems = new Map<string, SharedData<any, any>>();

const wrapRoot = wrapRootInit(wrappedItems);
const addEnvironment = addEnvironmentInit(wrappedItems);
const getEnv = getEnvInit(wrappedItems);
const addEnvironmentByName = addEnvironmentByNameInit(wrappedItems);
const addRoot = addRootInit(wrappedItems);
const getRoot = getRootInit(wrappedItems);
const removeRoot = removeRootInit(wrappedItems);
const addRootByName = addRootByNameInit(wrappedItems);

export {addActions} from "./core/add-actions"
export {addComputations} from "./core/add-computations"
export {setter} from "./core/setter"
export {revertible} from "./core/revertible"
export {allObservable} from './core/all-observable'

export {
  wrapRoot,
  addEnvironment,
  addEnvironmentByName,
  addRoot,
  addRootByName,
  getRoot,
  getEnv,
  removeRoot,
}
