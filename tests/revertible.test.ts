import {observable, runInAction} from "mobx";
import * as faker from 'faker';
import {revertible} from "../core/revertible";

describe('revertible', () => {
    const initialName = faker.random.word(), initialLastName = faker.random.word();
    interface TestClass {
        revert: (key?: string) => void;
    }

    @revertible(['name', 'lastName'])
    class TestClass {
        @observable
        name: string = initialName;
        @observable
        lastName: string = initialLastName;
    }

    it('should revert passed key property', () => {
        const test = new TestClass();
        const newName = faker.random.word();

        runInAction(() => {
            test.name = newName;
        });

        expect(test.name).toEqual(newName);

        test.revert('name');

        expect(test.name).toEqual(initialName);
    });

    it('should revert all properties when no key passed', () => {
        const test = new TestClass();
        const newName = faker.random.word();
        const newLastName = faker.random.word();

        runInAction(() => {
            test.name = newName;
            test.lastName = newLastName;
        });

        expect(test.name).toEqual(newName);
        expect(test.lastName).toEqual(newLastName);

        test.revert();

        expect(test.name).toEqual(initialName);
        expect(test.lastName).toEqual(initialLastName);
    });

    it('should throw error if empty props', (done) => {
        try {
            @revertible([])
            class Test {}
        } catch (e) {
            expect(e.message).toEqual('[mobx-easy] - Please provide an array of properties to watch');
            done();
        }
    });
});
