import {observable} from "mobx";
import * as faker from 'faker';
import {addActions} from "../core/add-actions";

const time = Date.now();

describe('addActions', () => {
    const actions = (self: ActionLess) => ({
        addEntity: () => self.entities.push({name: faker.random.word()}),
        removeEntity: () => self.entities.pop(),
        updateTime: () => self.time = time
    });

    interface ActionLess {
        addEntity: () => void;
        removeEntity: () => void;
        updateTime: () => void;
    }

    @addActions(actions)
    class ActionLess {
        @observable
        entities: any[] = []
        @observable
        time: number = faker.date.future().valueOf()
    }

    it('should have all new actions defined', () => {
        const test = new ActionLess();

        expect(test.addEntity).toBeDefined();
        expect(test.removeEntity).toBeDefined();
        expect(test.updateTime).toBeDefined();
    });

    it('should update observables through new actions', () => {
        const test = new ActionLess();

        test.addEntity();

        expect(test.entities.length).toEqual(1);

        test.removeEntity();

        expect(test.entities.length).toEqual(0);

        test.updateTime();

        expect(test.time).toEqual(time);
    });
});
