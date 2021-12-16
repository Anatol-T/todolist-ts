import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type FilterType = "All" | "Active" | "Completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}
type tasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ])

  let [tasks, setTasks] = useState<tasksStateType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Fish", isDone: true},
      {id: v1(), title: "Fruits", isDone: false},
      {id: v1(), title: "Sausages", isDone: false},
      {id: v1(), title: "Sugar", isDone: false},
    ]
  });

  const addTodolist = (text: string) => {
    const newID = v1()
    const newTodolist: TodolistType = {id: newID, title: text, filter: "All"}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [newID]: [{id: v1(), title: "Add new tasks", isDone: false}]})
  }
  const deleteTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(f => f.id !== todolistID))
    delete tasks[todolistID]
    setTasks({...tasks})
  }
  const changeTodolistTitle = (todolistID: string, newTitle: string) => {
    setTodolists(todolists.map(m=> m.id === todolistID ? {...m, title: newTitle} : m))
  }

  const removeTask = (todolistID: string, taskID: string) => {
    // let tasks1 = tasks.filter(task => task.id !== taskID)
    setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== taskID)})
  }
  const addTask = (todolistID: string, title: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false};
    // setTasks([task, ...tasks])
    setTasks({
      ...tasks,
      [todolistID]: [newTask, ...tasks[todolistID]]
    })
  }
  const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
    // setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone} : task))
    setTasks({
      ...tasks, [todolistID]: tasks[todolistID]
        .map(m => m.id === taskID ? {...m, isDone: isDone} : m)
    })
  }
  const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasks, [todolistID]: tasks[todolistID]
        .map(m => m.id === taskID ? {...m, title: newTitle} : m)
    })
  }

  return (
    <div className="App">
      <div>
        <h3>Add new todolist</h3>
        <AddItemForm addItem={addTodolist}/>
      </div>
      {todolists.map(m => {
        return (
          <TodoList
            key={m.id}
            title={m.title}
            tasks={tasks[m.id]}
            deleteTodolist={deleteTodolist}
            changeTodolistTitle={changeTodolistTitle}
            addTask={addTask}
            deleteTask={removeTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            todolistID={m.id}
          />
        )
      })}
    </div>
  );
}

export default App;
