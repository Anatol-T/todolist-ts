import {v1} from "uuid";
import {addTodolistAC, changeFilterAC, changeTodoTitleAC, deleteTodolistAC, TodolistsReducer} from "./TodolistsReducer";
import {TodolistType} from "../App";

test.skip('should delete todolist', ()=> {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ]
  const endState:Array<TodolistType> = TodolistsReducer(startState, deleteTodolistAC(todolistID1))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('should add new todolist', ()=> {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ]
  const endState = TodolistsReducer(startState, addTodolistAC('new todolist Title'))
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('new todolist Title')
})

test('should change filter correctly', ()=> {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ]
  const endState = TodolistsReducer(startState, changeFilterAC(todolistID2, 'Active'))
  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe('Active')
})

test('should change todolist title', ()=> {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ]
  const endState = TodolistsReducer(startState, changeTodoTitleAC(todolistID1, 'changed title'))
  expect(endState[0].title).toBe('changed title')
  expect(endState[1].title).not.toBe('changed title')
  expect(endState[1].title).toBe(startState[1].title)
})