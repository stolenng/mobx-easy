import * as faker from 'faker';
import {allObservable} from "../core/all-observable";
import {isObservable} from 'mobx';

describe('allObservable', () => {
    it('should add all observables', () => {
        @allObservable()
        class Test {
            name: string = '';
            number: number = faker.random.number();
            excludedProp: string = '';
        }

        const instance = new Test();

        expect(isObservable(instance.name)).toEqual(true);
        expect(isObservable(instance.number)).toEqual(true);
        expect(isObservable(instance.excludedProp)).toEqual(true);
    });

    it('should exclude passed keys', () => {
        @allObservable(['excludedProp'])
        class Test {
            name: string = '';
            number: number = faker.random.number();
            excludedProp: string = '';
        }

        const instance = new Test();

        expect(isObservable(instance.name)).toEqual(true);
        expect(isObservable(instance.number)).toEqual(true);
        expect(isObservable(instance.excludedProp)).toEqual(false);
    });
});
