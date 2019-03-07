import { createStore } from "redux-dynamic-modules";
import { compose } from "redux";
import { getSagaExtension } from "../SagaExtension";
import { ISagaModule } from "../Contracts";
import { SagaIterator } from "redux-saga";
describe("Saga extension tests", () => {
    it("Saga extension registers module and starts saga", () => {
        const testContext = {};
        called = false;
        createStore({}, [], [getSagaExtension(testContext)], compose, getTestModule());
        expect(called);

        expect(testContext["moduleManager"]).toBeTruthy();
    });
});

function getTestModule(): ISagaModule<{ a: string }> {
    return {
        id: "test-module",
        sagas: [testSaga],
    };
}

let called = false;
function* testSaga(): SagaIterator {
    called = true;
}
