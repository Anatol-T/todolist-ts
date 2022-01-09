import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType, todolistID1, todolistID2} from "./TodolistsReducer";

const initialState = {
  [todolistID1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ],
  [todolistID2]: [
    {id: v1(), title: "HTML&CSS2", isDone: true},
    {id: v1(), title: "JS2", isDone: true},
    {id: v1(), title: "ReactJS2", isDone: false},
    {id: v1(), title: "Rest API2", isDone: false},
    {id: v1(), title: "GraphQL2", isDone: false},
  ]
}

export const TasksReducer = (tasks: TasksStateType = initialState, action: GeneralActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {...tasks,
        [action.payload.todolistID]:tasks[action.payload.todolistID]
          .filter(f=> f.id !== action.payload.taskID)}
    case "ADD-TASK": {
      const task = { id: v1(), title: action.payload.title, isDone: false };
      return {...tasks,
        [action.payload.todolistID]:[task, ...tasks[action.payload.todolistID]]}
    }
    case "CHANGE-STATUS":
      return {...tasks,
        [action.payload.todolistID]: tasks[action.payload.todolistID]
          .map(m=>m.id === action.payload.taskID? {...m, isDone: action.payload.isDone}: m)}
    case "CHANGE-TASK-TITLE":
      return {...tasks,
        [action.payload.todolistID]: tasks[action.payload.todolistID]
          .map(m=>m.id === action.payload.taskID? {...m, title: action.payload.editedTitle}: m)}
    case "DELETE-TODOLIST":{
      const copy = {...tasks}
      delete copy[action.payload.todolistID]
      return copy
    }
    case "ADD-TODOLIST":
      return {...tasks, [action.payload.newId]:[]}
    default:
      return tasks
  }
}


type GeneralActionsType = RemoveTaskActionType | AddTaskActionType
  | ChangeStatusACType | changeTaskTitleACType| AddTodolistActionType
  | DeleteTodolistActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistID,
      taskID
    }
  } as const
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todolistID,
      title
    }
  } as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
  return {
    type: "CHANGE-STATUS",
    payload: {
      todolistID,
      taskID,
      isDone
    }
  } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string, editedTitle: string) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      todolistID,
      taskID,
      editedTitle
    }
  } as const
}
