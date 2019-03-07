import { IExtension, IModuleStore } from "../Contracts";
import { createStore } from "../ModuleStore";
import { Middleware, compose } from "redux";

describe("Store with extensions", () => {
    let testExtension: IExtension;
    let testStore: IModuleStore<{}>;

    beforeEach(() => {
        testExtension = {
            onModuleAdded: jest.fn(),
            onModuleManagerCreated: jest.fn(),
            onModuleRemoved: jest.fn(),
            dispose: jest.fn(),
        };
    });

    it("Registers additional middleware", () => {
        const middlewareFunction = jest.fn();

        const middleware: Middleware = api => next => action => {
            middlewareFunction();
        };
        testExtension.middleware = [middleware];
        testStore = createStore({}, [], [testExtension], compose);

        testStore.dispatch({ type: "ANY" });
        expect(middlewareFunction).toHaveBeenCalled();
    });

    it("Manager created called", () => {
        testStore = createStore({}, [], [testExtension], compose);
        expect(testExtension.onModuleManagerCreated).toHaveBeenCalled();
    });

    it("OnModule Added called", () => {
        testStore = createStore({}, [], [testExtension], compose);
        testStore.addModule({ id: "new_module" });
        expect(testExtension.onModuleAdded).toHaveBeenCalled();
    });

    it("OnModule Removed called", () => {
        testStore = createStore({}, [], [testExtension], compose);
        const module = testStore.addModule({ id: "new_module" });
        module.remove();

        expect(testExtension.onModuleRemoved).toHaveBeenCalled();
    });
});
