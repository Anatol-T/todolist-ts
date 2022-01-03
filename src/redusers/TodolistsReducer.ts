import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState:Array<TodolistType> = [
  {id: todolistID1, title: 'What to learn', filter: 'All'},
  {id: todolistID2, title: 'What to buy', filter: 'All'},
]

export const TodolistsReducer = (todolists: Array<TodolistType> = initialState, action: GeneralActionsType): Array<TodolistType> => {
  switch (action.type) {
    case "DELETE-TODOLIST":
      return todolists.filter(f=> f.id !== action.payload.todolistID)
    case "ADD-TODOLIST": {
      const newTodoList: TodolistType =
        {id: action.payload.newId, title: action.payload.newTitle, filter: "All"}
      return [newTodoList, ...todolists]
    }
    case "CHANGE-FILTER":
      return todolists
        .map(m=> m.id === action.payload.todolistID
          ? {...m, filter: action.payload.value}
          : m)
    case "CHANGE-TITLE":
      return todolists
        .map(m=> m.id === action.payload.todolistID
          ? {...m, title: action.payload.title}
          : m)
    default:
      return todolists
  }
}


type GeneralActionsType
  = DeleteTodolistActionType | AddTodolistActionType | ChangeFilterACActionType | ChangeTodolistTitleACActionType
type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>

export const deleteTodolistAC = (todolistID: string) => {
  return {
    type: "DELETE-TODOLIST",
    payload: {
      todolistID
    }
  } as const
}
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newId:string, newTitle: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      newId,
      newTitle
    }
  } as const
}
type ChangeFilterACActionType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterType) => {
  return {
    type: "CHANGE-FILTER",
    payload: {
      todolistID,
      value
    }
  } as const
}

type ChangeTodolistTitleACActionType = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todolistID: string, title: string) => {
  return {
    type: "CHANGE-TITLE",
    payload: {
      todolistID,
      title
    }
  } as const
}