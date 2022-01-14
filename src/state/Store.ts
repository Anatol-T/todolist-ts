import {combineReducers, createStore} from "redux";
import {TodolistsReducer} from "../redusers/TodolistsReducer";
import {TasksReducer} from "../redusers/TasksReducer";


const rootReducer = combineReducers({
  todolists: TodolistsReducer,
  tasks: TasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.state = store.getState()