import {observable} from "mobx";
import * as faker from 'faker';
import {setter} from "../index";

describe('setter', () => {
    const initialWord = faker.random.word(), changedWord = faker.random.word();

    interface TestClass {
        setTestProp: (key: string) => void;
        setDefaultValue: (key?: string) => void;
        setNumber: (number: number) => void;
    }

    class TestClass {
        @setter('setTestProp')
        @observable
        testProp: string = initialWord;
        @setter('setDefaultValue', 'defaultValue')
        @observable
        withDefaultValue: string = '';
        @setter('setNumber')
        @observable
        number: number = 999;
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

    it("should set value with the setter default value", () => {
        const instance = new TestClass();
        instance.setDefaultValue();
        expect(instance.withDefaultValue).toEqual('defaultValue');
    });

    it('should save zero values', () => {
        const instance = new TestClass();
        instance.setNumber(0);
        expect(instance.number).toEqual(0);
    });
});
