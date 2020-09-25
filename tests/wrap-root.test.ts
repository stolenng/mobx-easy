import * as faker from 'faker';
import {wrapRoot as wrapRootInit} from '../core/wrap-root';
import {classFieldName, logPrefix} from "../common/utils";

describe('wrapRoot', () => {
    let wrapRoot, env;
    const initSpy = jest.fn(), wrapperItems = new Map();

    class A {

    }

    class RootStoreWithInit {
        data: any;
        classA: A;
        constructor(data: any) {
            this.data = data;
            this.classA = new A();
        }
        init() {
            initSpy();
        }
    }

    beforeEach(() => {
        wrapRoot = wrapRootInit(wrapperItems);

        env = {
            test: faker.random.number()
        };
    });

    afterEach(() => {
        wrapperItems.clear();
    });

    describe('successful flow', () => {
        let result, rootStoreParams = {test: 'true'};

        beforeEach(() => {
            result = wrapRoot({
                rootStoreConstructorParams: rootStoreParams,
                rootStoreInitParams: rootStoreParams,
                RootStore: RootStoreWithInit,
                assignIdsToClasses: true,
                env
            });
        })

        describe('objects', () => {
            let fakeObject = {init: jest.fn()}, rootObject;

           beforeEach(() => {
               rootObject = wrapRoot({
                   RootStore: fakeObject,
                   env
               });
           })

            it('should init successfully', () => {
                expect(fakeObject.init).toBeCalled();
            });

            it('should set root and env in wrapperItems', () => {
                expect(wrapperItems.values().next().value.root).toEqual(result);
                expect(wrapperItems.values().next().value.environmentData).toEqual(env);
            });
        })

        it('should return new root instance with id', () => {
            expect(result).toBeInstanceOf(RootStoreWithInit);
        });

        it('should create new instance with passed constructor params', () => {
            expect(result.data).toEqual(rootStoreParams);
        });

        it('should set root and env in wrapperItems', () => {
            expect(wrapperItems.values().next().value.root).toEqual(result);
            expect(wrapperItems.values().next().value.environmentData).toEqual(env);
        });

        it('should call root instance init function', () => {
            expect(initSpy).toHaveBeenCalled();
        });

        it('should allow wrapping with custom name', () => {
            const customName = faker.random.word();

            result = wrapRoot({
                RootStore: RootStoreWithInit,
                env,
                wrapperName: customName
            });

            expect(wrapperItems.get(customName).root).toEqual(result);
            expect(wrapperItems.get(customName).environmentData).toEqual(env);
        });

        it('should assign id to class', () => {
            expect(result.classA[classFieldName]).toBeDefined();
        });
    })

    describe('error flow', () => {
        it('should throw error if no init function on root', (done) => {
            class TestClass {
            }

            try {
                wrapRoot({
                    RootStore: TestClass,
                    env
                })
            } catch (e) {
                expect(e.message).toEqual(`${logPrefix} root store must have init function!`)
                done();
            }
        });

        it('should throw error if no environment passed', (done) => {
            try {
                wrapRoot({RootStoreWithInit, env: null})
            } catch (e) {
                expect(e.message).toEqual(`${logPrefix} no environment was passed!`)
                done();
            }
        });
    });
});
