import {action} from "mobx";

const {defineProperty} = Object;

const setter = (name: string, defaultValue?: any) => {
    return function (target, propertyKey: string) {
        const fnDesc = action.bound(target, name, {
            value: function (value) {
                this[propertyKey] = value || defaultValue;
            }
        }) as any;

        defineProperty(target, name, fnDesc);
    };
};

export {
    setter
};
