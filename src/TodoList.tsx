import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  addTask: (title: string) => void
  deleteTask: (taskID: string) => void
}
type FilterType = "All" | "Active" | "Completed"

function TodoList({title, tasks, addTask, deleteTask}: PropsType) {

  const [filter, setFilter] = useState<FilterType>("All");
  const [inputTitle, setInputTitle] = useState<string>("")

  let filteredTasks = filter === "Active"
    ? tasks.filter(task => !task.isDone)
    : filter === "Completed"
      ? tasks.filter(task => task.isDone)
      : tasks;
  const onChangeFilter = (f: FilterType) => setFilter(f);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) addTaskHandler()
  }
  const addTaskHandler = () => {
    addTask(inputTitle);
    setInputTitle("");
  }

  const tasksJSX = filteredTasks.map(task => {
    const onDeleteHandler = () => {
      deleteTask(task.id)
    }
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={onDeleteHandler}>X</button>
      </li>
    )
  })

  return <div>
    <h3>{title}</h3>
    <div>
      <input value={inputTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}/>
      <button onClick={addTaskHandler}>+</button>
    </div>
    <ul>
      {tasksJSX}
    </ul>
    <div>
      <button onClick={() => {
        onChangeFilter("All")
      }}>All
      </button>
      <button onClick={() => {
        onChangeFilter("Active")
      }}>Active
      </button>
      <button onClick={() => {
        onChangeFilter("Completed")
      }}>Completed
      </button>
    </div>
  </div>

}

export default TodoList;