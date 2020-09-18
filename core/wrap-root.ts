import {WrapperItems} from "../common/types";
import {generateId, logPrefix} from "../common/utils";

export interface IInit {
    init: () => void;
}

export interface WrapRootOptions<E, R, P> {
    rootStoreParams?: P;
    RootStore: new (rootStoreParams?: P) => R;
    env: E;
    wrapperName?: string;
}

const wrapRoot = (wrapperItems: WrapperItems) => {
    return <R extends IInit, E, P>({RootStore, env, wrapperName, rootStoreParams}: WrapRootOptions<E, R, P>): R => {
        const id = generateId();

        if (!env) {
            throw new Error(`${logPrefix} no environment was passed!`);
        }

        let instance;

        try {
            instance = new RootStore(rootStoreParams);
        } catch (e) {
            instance = RootStore;
        }

        if (initFunctionDoesntExists(instance)) {
            throw new Error(`${logPrefix} root store must have init function!`);
        }

        if (wrapperName && wrapperItems.get(wrapperName)) {
            throw new Error(`${logPrefix} wrapper name already exists! please provide different name.`);
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
