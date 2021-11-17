import React, {useState} from 'react';
import {TaskType} from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  deleteTask: (taskID: number) => void
}
type FilterType = "All" | "Active" | "Completed"

function TodoList({title, tasks, deleteTask}: PropsType) {

  const [filter, setFilter] = useState<FilterType>("All");

  let filteredTasks = filter === "Active"
    ? tasks.filter(task => task.isDone === false)
    : filter === "Completed"
      ? tasks.filter(task => task.isDone === true)
      : tasks;
  const changeFilter = (f:FilterType) => setFilter(f)

  const tasksJSX = filteredTasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={() => deleteTask(task.id)}>X</button>
      </li>
    )
  })
  return <div>
    <h3>{title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {tasksJSX}
    </ul>
    <div>
      <button onClick={() => {changeFilter("All")}}>All</button>
      <button onClick={() => {changeFilter("Active")}}>Active</button>
      <button onClick={() => {changeFilter("Completed")}}>Completed</button>
    </div>
  </div>

}

export default TodoList;