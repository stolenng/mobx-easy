import {observable} from "mobx";
import * as faker from 'faker';
import {setter} from "../index";

describe('setter', () => {
    const initialWord = faker.random.word(), changedWord = faker.random.word();

    interface TestClass {
        setTestProp: (key: string) => void;
    }

    class TestClass {
        @setter('setTestProp')
        @observable
        testProp: string = initialWord;
    }

    it("should add setter", () => {
        const instance = new TestClass();
        expect(instance.testProp).toEqual(initialWord);
        expect(instance.setTestProp).toBeDefined();
    });

    it("should set value with the setter", () => {
        const instance = new TestClass();
        instance.setTestProp(changedWord);
        expect(instance.testProp).toEqual(changedWord);
    });
});
