import { Constructor } from "../common/types";
import { computed } from "mobx";

const { defineProperty } = Object;

const addComputations = (computationsFetcher: (self) => object) => {
  return function <T extends Constructor>(BaseClass: T) {
    return class extends BaseClass {
      constructor(...args: any[]) {
        super(...args);

        const computations = computationsFetcher(this);

        for (let computation in computations) {
           let temp = computed(computations[computation]);

           defineProperty(this, computation, {
             get: () => temp.get()
           })
        }
      }
    };
  };
};

export {
  addComputations
};
