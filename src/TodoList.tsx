import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";

type PropsType = {
  title: string,
  tasks: Array<TaskType>
  addTask: (title: string) => void
  deleteTask: (taskID: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
}
type FilterType = "All" | "Active" | "Completed"

function TodoList({title, tasks, addTask, deleteTask, changeTaskStatus}: PropsType) {

  const [filter, setFilter] = useState<FilterType>("All");
  const [inputTitle, setInputTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const filteredTasks = filter === "Active"
    ? tasks.filter(task => !task.isDone)
    : filter === "Completed"
      ? tasks.filter(task => task.isDone)
      : tasks;

  const onChangeFilter = (f: FilterType) => setFilter(f);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value);
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') addTaskHandler()
  }
  const addTaskHandler = () => {
    const trimmedTitle = inputTitle.trim();
    if (trimmedTitle) {
      addTask(trimmedTitle);
      setInputTitle("");
    } else {
      setInputTitle("")
      setError(true)
    }
  }

  const getClasses = (f:FilterType) => {
    return filter === f ? "active-filter": ""
  }

  const tasksJSX = filteredTasks.map(task => {
    const onDeleteHandler = () => {deleteTask(task.id)};
    const changeStatus = (e:ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(task.id, e.currentTarget.checked)
    }
    return (
      <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <input onChange={changeStatus} type="checkbox" checked={task.isDone}/>
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
             onKeyPress={onKeyPressHandler}
             className={error ? "error": ""}
      />
      <button onClick={addTaskHandler}>+</button>
      {error && <div className="error-message">Title is required</div>}
    </div>
    <ul>
      {tasksJSX}
    </ul>
    <div>
      <button className={getClasses("All")}
              onClick={() => {onChangeFilter("All")}}>All
      </button>
      <button className={getClasses("Active")}
              onClick={() => {onChangeFilter("Active")}}>Active
      </button>
      <button className={getClasses("Completed")}
              onClick={() => {onChangeFilter("Completed")}}>Completed
      </button>
    </div>
  </div>

}

export default TodoList;