import {WrapperItems} from "../common/types";
import {logPrefix} from "../common/utils";

const removeRoot = (wrapperItems: WrapperItems) => {
    return (name?: string) => {
        if (name) {
            const isDeleted = wrapperItems.delete(name)

            if (!isDeleted) {
                throw new Error(`${logPrefix} failed to delete ${name}, key not found!`);
            }
        } else {
            wrapperItems.clear();
        }
    }
};

export {
    removeRoot
};
