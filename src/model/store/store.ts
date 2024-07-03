import {combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../../model/todolists-reducer";
import {taskReducer} from "../../model/task-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: taskReducer
})

export const store = legacy_createStore(rootReducer);