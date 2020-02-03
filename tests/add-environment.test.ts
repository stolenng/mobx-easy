import * as faker from 'faker';
import {wrapRoot as wrapRootInit} from "../core/wrap-root";
import {
    addEnvironment as addEnvironmentInit,
    addEnvironmentByName as addEnvironmentByNameInit,
    getEnv as getEnvInit
} from "../core/add-environment";
import {getRoot as getRootInit} from "../core/add-root";


describe('addEnvironment', () => {
    let wrapRoot, addEnvironment, addEnvironmentByName, env;
    const initSpy = jest.fn(), wrapperItems = new Map();

    beforeEach(() => {
        wrapRoot = wrapRootInit(wrapperItems);
        addEnvironment = addEnvironmentInit(wrapperItems);
        addEnvironmentByName = addEnvironmentByNameInit(wrapperItems);

        env = {
            test: faker.random.number()
        };
    });

    afterEach(() => {
        wrapperItems.clear();
    });

    it('should return environemnt', () => {
        class Root {
            notRoot;

            init() {
                this.notRoot = new NotRoot();
            }
        }

        @addEnvironment
        class NotRoot {

        }

        const result = wrapRoot({
            RootStore: Root,
            env
        });

        expect(result.notRoot.getEnv()).toEqual(env);
    });

    it('should return environment by name', () => {
        const fakeName = faker.random.word();

        class Root {
            notRoot;

            init() {
                this.notRoot = new NotRoot();
            }
        }

        @addEnvironmentByName(fakeName)
        class NotRoot {

        }

        const result = wrapRoot({
            RootStore: Root,
            env,
            wrapperName: fakeName
        });

        expect(result.notRoot.getEnv()).toEqual(env);
    });

    it('should return correct environment multiple wrapped items', () => {
        const env2 = {
            test: faker.random.word()
        }, fakeName1 = faker.random.word(), fakeName2 = faker.random.word();

        @addEnvironmentByName(fakeName1)
        class NotRoot1 {

        }

        class Root1 {
            notRoot;

            init() {
                this.notRoot = new NotRoot1();
            }
        }

        @addEnvironmentByName(fakeName2)
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
            env: env,
            wrapperName: fakeName1
        });
        const result2 = wrapRoot({
            RootStore: Root2,
            env: env2,
            wrapperName: fakeName2
        });

        expect(result1.notRoot.getEnv()).toEqual(env);
        expect(result2.notRoot.getEnv()).toEqual(env2);
    })
});


describe('getEnv', () => {
    let wrapRoot, getEnv, env;
    const initSpy = jest.fn(), wrapperItems = new Map();

    beforeEach(() => {
        wrapRoot = wrapRootInit(wrapperItems);
        getEnv = getEnvInit(wrapperItems);

        env = {
            test: faker.random.number()
        };
    });

    afterEach(() => {
        wrapperItems.clear();
    });

    it('should return env', () => {
        class Root {
            init() {
            }
        }

        wrapRoot({
            RootStore: Root,
            env
        });

        expect(getEnv()).toEqual(env);
    });

    it('should return env by name', () => {
        const fakeName = faker.random.word();

        class Root {
            init() {
            }
        }

        wrapRoot({
            RootStore: Root,
            env,
            wrapperName: fakeName
        });

        expect(getEnv(fakeName)).toEqual(env);
    });
});
