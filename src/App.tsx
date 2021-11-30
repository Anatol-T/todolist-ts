import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML", isDone: true},
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "React", isDone: false}
  ])
  const removeTask = (taskID: string) => {
    let tasks1 = tasks.filter(task => task.id !== taskID)
    setTasks(tasks1)
  }
  const addTask = (title: string) => {
    const task: TaskType = {id: v1(), title, isDone: false};
    setTasks([task, ...tasks])
  }
  const changeStatus = (id: string, isDone: boolean) => {
    setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone}: task))
    // const task = tasks.find(task => task.id === id)
    // if (task) {
    //   task.isDone = isDone;
    //   setTasks([...tasks])
    // }

  }

  return (
    <div className="App">
      <TodoList title={"What to learn"}
                tasks={tasks}
                addTask={addTask}
                deleteTask={removeTask}
                changeTaskStatus={changeStatus}
      />
      <TodoList title={"What to learn"}
                tasks={tasks}
                addTask={addTask}
                deleteTask={removeTask}
                changeTaskStatus={changeStatus}
      />
    </div>
  );
}

export default App;
