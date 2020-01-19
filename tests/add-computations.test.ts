import {observable} from "mobx";
import * as faker from 'faker';
import {addComputations} from "../core/add-computations";

describe('addComputations', () => {
    const firstName = faker.random.word(), lastName = faker.random.word(), spy = jest.fn();

    const computations = (self: ComputationLess) => ({
        getFullName: () => {
            spy();
            return `${self.firstName}_${self.lastName}`
        }
    });

    interface ComputationLess {
        getFullName: () => string;
    }

    @addComputations(computations)
    class ComputationLess {
        @observable
        firstName: string = firstName;
        @observable
        lastName: string = lastName;
    }

    it('should add computations', () => {
       const test = new ComputationLess();

       expect(test.getFullName).toBeDefined();
    });

    it('should return computed value', () => {
        const test = new ComputationLess();

        expect(test.getFullName).toEqual(`${test.firstName}_${test.lastName}`)
    });
});
