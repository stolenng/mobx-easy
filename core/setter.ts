import {action} from "mobx";

const {defineProperty} = Object;

const setter = (name: string, defaultValue?: any) => {
    return function (target, propertyKey: string) {
        const fnDesc = action.bound(target, name, {
            value: function (value) {
                const shouldUseValue = value || (typeof value === 'number' && Number.isInteger(value));
                this[propertyKey] = shouldUseValue ? value : defaultValue;
            }
        }) as any;

        defineProperty(target, name, fnDesc);
    };
};

export {
    setter
};
