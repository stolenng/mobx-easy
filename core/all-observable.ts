import {Constructor} from "../common/types";
import {observable} from "mobx";

const allObservable = (exclude?: string[]) => {
    return function <T extends Constructor>(BaseClass: T) {
        return class extends BaseClass {
            constructor(...args: any[]) {
                super(...args);

                for (const key of Object.keys(this)) {
                    if (typeof this[key] !== 'function' && shouldAddObservable(key, exclude || [])) {
                        this[key] = observable.box(this[key]);
                    }
                }
            }
        };
    };
};

const shouldAddObservable = (key: string, excludedArray: string[]) => excludedArray.length > 0 ? excludedArray.indexOf(key) : true;

export {
    allObservable
}
