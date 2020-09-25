import {WrapperItems} from "../common/types";
import {assignIdsToClassesRecursive, generateId, logPrefix} from "../common/utils";

export interface IInit<T> {
    init: (initParams?: T) => void;
}

export interface WrapRootOptions<E, R, RCP, RIP> {
    rootStoreConstructorParams?: RCP;
    rootStoreInitParams?: RIP;
    RootStore: new (rootStoreParams?: RCP) => R;
    env: E;
    assignIdsToClasses?: boolean;
    wrapperName?: string;
}

const wrapRoot = (wrapperItems: WrapperItems) => {
    return <R extends IInit<RIP>, E, RCP, RIP>({
                                                   RootStore,
                                                   env,
                                                   wrapperName,
                                                   assignIdsToClasses = false,
                                                   rootStoreInitParams,
                                                   rootStoreConstructorParams
                                               }: WrapRootOptions<E, R, RCP, RIP>): R => {
        const id = generateId();

        if (!env) {
            throw new Error(`${logPrefix} no environment was passed!`);
        }

        let instance;

        try {
            instance = new RootStore(rootStoreConstructorParams);
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

        instance.init(rootStoreInitParams);

        if (assignIdsToClasses) {
            assignIdsToClassesRecursive({
                baseClass: instance,
                id: wrapperName || id
            });
        }

        return instance;
    };
};

const initFunctionDoesntExists = (instance) => !instance.init || typeof instance.init !== "function";

export {
    wrapRoot
};
