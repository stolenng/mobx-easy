import {SharedData, WrapperItems} from "./types";

const logPrefix = `[mobx-easy] -`;
const classFieldName = `mobx_easy_id`;

const getFirstWrapper = (wrapperItems: WrapperItems) => {
    if (wrapperItems.size === 0) {
        throw new Error(`${logPrefix} no wrapped items!`);
    }

    const values = wrapperItems.values();

    return values.next();
};

const getWrapper = (wrapperItems: WrapperItems, wrapperId: string): SharedData<any, any> => {
    const wrapper = wrapperItems.get(wrapperId);

    if (!wrapper) {
        throw new Error(`${logPrefix} no wrapper items id: ${wrapperId}, wrapperItems size: ${wrapperItems.size}`);
    }

    return wrapper;
};

const generateId = (): string => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const assignIdsToClassesRecursive = ({baseClass, id}) => {
    if (!baseClass) {
        return;
    }

    baseClass[classFieldName] = id;

    const fieldNames = Object.getOwnPropertyNames(baseClass);

    for (let field of fieldNames) {
        const currentField = baseClass[field];
        currentField[classFieldName] = id;

        if (currentField.constructor) {
            assignIdsToClassesRecursive(currentField);
        }
    }
};

export {
    logPrefix,
    classFieldName,
    getFirstWrapper,
    assignIdsToClassesRecursive,
    generateId,
    getWrapper
}
