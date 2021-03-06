import {CollapsableSidebarContainerState} from "../../state/ContainersState";
import {collapsableSidebarReducer} from "./collapsable-side.reducer";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
import {Dispatcher} from "@ngrx/store";
let deepfreeze = require("deep-freeze");

describe("reducer: containers > collaspableSidebarReducer", () => {
    describe("case CONTAINER_COLLAPSABLESIDEBAR_TOGGLE", () => {
        it("should return a new state with a different isCollapsed value", () => {
            let initialState: CollapsableSidebarContainerState = {
                isCollapsed: false
            };
            deepfreeze(initialState);
            let changedState: CollapsableSidebarContainerState =
                collapsableSidebarReducer(initialState, {type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
            expect(changedState).not.toBe(initialState);
            expect(changedState.isCollapsed).toBe(true);
            initialState = {
                isCollapsed: true
            };
            changedState = collapsableSidebarReducer(initialState, {type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
            expect(changedState.isCollapsed).toBe(false);

        });
    });
    describe("case default", () => {
        it("should return the exact same reference as before", () => {
            let initialState: CollapsableSidebarContainerState = {
                isCollapsed: false
            };
            deepfreeze(initialState);
            let changedState: CollapsableSidebarContainerState = collapsableSidebarReducer(initialState, {type: null});
            expect(changedState).toBe(initialState);
        });
    });
    describe("case @ngrx/store/init", () => {
        it("should return the default value for the state param", () => {
            let changedState: CollapsableSidebarContainerState = collapsableSidebarReducer(undefined, {type: Dispatcher.INIT});
            expect(changedState.isCollapsed).toBeFalsy();
        });
    });
});