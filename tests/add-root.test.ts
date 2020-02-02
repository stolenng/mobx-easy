import * as faker from 'faker';
import {addRoot as addRootInit, addRootByName as addRootByNameInit} from "../core/add-root";
import {wrapRoot as wrapRootInit} from "../core/wrap-root";

describe('addRoot', () => {
    let wrapRoot, addRoot, addRootByName, env;
    const initSpy = jest.fn(), wrapperItems = new Map();

    beforeEach(() => {
        wrapRoot = wrapRootInit(wrapperItems);
        addRoot = addRootInit(wrapperItems);
        addRootByName = addRootByNameInit(wrapperItems);

        env = {
            test: faker.random.number()
        };
    });

    afterEach(() => {
        wrapperItems.clear();
    });

    it('should return root instance', () => {
        class Root {
            notRoot;

            init() {
                this.notRoot = new NotRoot();
            }
        }

        @addRoot
        class NotRoot {

        }

        const result = wrapRoot({
            RootStore: Root,
            env: {}
        });

        expect(result.notRoot.getRoot()).toEqual(result);
    });

    it('should return root instance by name', () => {
        const fakeName = faker.random.word();

        class Root {
            notRoot;

            init() {
                this.notRoot = new NotRoot();
            }
        }

        @addRootByName(fakeName)
        class NotRoot {

        }

        const result = wrapRoot({
            RootStore: Root,
            env: {},
            wrapperName: fakeName
        });

        expect(result.notRoot.getRoot()).toEqual(result);
    });

    it('should return correct root store when multiple wrapped items', () => {
        const fakeName1 = faker.random.word(), fakeName2 = faker.random.word();

        @addRootByName(fakeName1)
        class NotRoot1 {

        }

        class Root1 {
            notRoot;

            init() {
                this.notRoot = new NotRoot1();
            }
        }

        @addRootByName(fakeName2)
        class NotRoot2 {

        }

        class Root2 {
            notRoot;

            init() {
                this.notRoot = new NotRoot2();
            }
        }

        const result1 = wrapRoot({
            RootStore: Root1,
            env: {},
            wrapperName: fakeName1
        });
        const result2 = wrapRoot({
            RootStore: Root2,
            env: {},
            wrapperName: fakeName2
        });

        expect(result1.notRoot.getRoot()).toEqual(result1);
        expect(result2.notRoot.getRoot()).toEqual(result2);
    })
});
