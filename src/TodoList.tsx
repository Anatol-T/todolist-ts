import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";

type PropsType = {
  title: string,
  todolistID: string
  tasks: Array<TaskType>
  deleteTodolist: (todolistID: string) => void
  addTask: (todolistID: string, title: string) => void
  deleteTask: (todolistID: string, taskID: string) => void
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
}
type FilterType = "All" | "Active" | "Completed"

function TodoList({title, todolistID, tasks, addTask, deleteTodolist, deleteTask, changeTaskStatus}: PropsType) {

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
      addTask(todolistID, trimmedTitle);
      setInputTitle("");
    } else {
      setInputTitle("")
      setError(true)
    }
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistID)
  }

  const getClasses = (f:FilterType) => {
    return filter === f ? "active-filter": ""
  }

  const tasksJSX = filteredTasks.map(task => {
    const onDeleteHandler = () => {deleteTask(todolistID, task.id)};
    const changeStatus = (e:ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todolistID, task.id, e.currentTarget.checked)
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
    <h3>{title}
      <button onClick={deleteTodolistHandler}>X</button></h3>

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