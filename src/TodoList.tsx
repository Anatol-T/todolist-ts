import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {DeleteForeverOutlined} from "@mui/icons-material";

type PropsType = {
  title: string,
  todolistID: string
  tasks: Array<TaskType>
  deleteTodolist: (todolistID: string) => void
  changeTodolistTitle: (todolistID: string, newTitle: string) => void
  addTask: (todolistID: string, title: string) => void
  deleteTask: (todolistID: string, taskID: string) => void
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
  changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
}
type FilterType = "All" | "Active" | "Completed"

function TodoList(
  {
    title, todolistID, tasks, deleteTodolist, changeTodolistTitle, addTask,
    deleteTask, changeTaskStatus, changeTaskTitle
  }: PropsType) {

  const [filter, setFilter] = useState<FilterType>("All");

  const filteredTasks = filter === "Active"
    ? tasks.filter(task => !task.isDone)
    : filter === "Completed"
      ? tasks.filter(task => task.isDone)
      : tasks;

  const onChangeFilter = (f: FilterType) => setFilter(f);

  const deleteTodolistHandler = () => {
    deleteTodolist(todolistID)
  }
  const changeTodolistTitleHandler = (newTitle: string)=> {
    changeTodolistTitle(todolistID,newTitle)
  }
  const addTaskHandler = (text: string) => {
    addTask(todolistID, text);
  }

  // const getClasses = (f: FilterType) => {
  //   return filter === f ? "active-filter" : ""
  // }

  const tasksJSX = filteredTasks.map(task => {
    const onDeleteHandler = () => {
      deleteTask(todolistID, task.id)
    };
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todolistID, task.id, e.currentTarget.checked)
    }
    const changeTitle = (newTitle: string) => {
      changeTaskTitle(todolistID, task.id, newTitle)
    }
    return (
      <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox onChange={changeStatus} checked={task.isDone} size="small"/>
        {/*<input onChange={changeStatus} type="checkbox" checked={task.isDone}/>*/}
        <EditableSpan title={task.title} changeCallback={changeTitle}/>
        <IconButton onClick={onDeleteHandler} size="small">
          < DeleteForeverOutlined />
        </IconButton>
        {/*<button onClick={onDeleteHandler}>X</button>*/}
      </li>
    )
  })

  return <div>
    <h3>
      <EditableSpan title={title} changeCallback={changeTodolistTitleHandler}/>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteForeverOutlined color="primary" sx={{fontSize: 40}}/>
      </IconButton>
      {/*<button onClick={deleteTodolistHandler}>X</button>*/}
    </h3>
    <AddItemForm addItem={addTaskHandler}/>
    <ul>
      {tasksJSX}
    </ul>
    <div>
      <ButtonGroup size="small" variant="contained">
        <Button color={filter === 'All' ? "success" : "primary"}
          //className={props.filter === 'all' ? "active-filter" : ""}
                onClick={() => {onChangeFilter("All")}}>All
        </Button>
        <Button color={filter === 'Active' ? "success" : "primary"}
                onClick={() => {onChangeFilter("Active")}}
        >Active
        </Button>
        <Button color={filter === 'Completed' ? "success" : "primary"}
                onClick={() => {onChangeFilter("Completed")}}>Completed
        </Button>
      </ButtonGroup>
    </div>
  </div>

}

export default TodoList;