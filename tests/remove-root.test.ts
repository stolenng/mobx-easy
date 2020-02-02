import * as faker from 'faker';
import {removeRoot as removeRootInit} from '../core/remove-root';
import {logPrefix} from "../common/utils";

describe('removeRoot', () => {
    let removeRoot, env;
    const initSpy = jest.fn(), wrapperItems = new Map();

    class RootStoreWithInit {
        init() {
            initSpy();
        }
    }

    beforeEach(() => {
        removeRoot = removeRootInit(wrapperItems);

        env = {
            test: faker.random.number()
        };

    });

    it('should remove wrapped root', () => {
        wrapperItems.set(faker.random.word(), {});

        removeRoot();

        expect(wrapperItems.size).toEqual(0);
    });

    it('should remove wrapper root by name', () => {
        const fakeName = faker.random.word();

        wrapperItems.set(fakeName, {});

        removeRoot(fakeName);

        expect(wrapperItems.size).toEqual(0);
    });

    it('should throw error if try to delete by name that doesnt exists', (done) => {
        const fakeName = faker.random.word();

        try {
            removeRoot(fakeName);
        } catch(e) {
            expect(e.message).toEqual(`${logPrefix} failed to delete ${fakeName}, key not found!`);
            done();
        }
    });
});
