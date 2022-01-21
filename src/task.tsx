import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {DeleteForeverOutlined} from "@mui/icons-material";
import {TaskType} from "./App";

type PropsType = {
  todolistID: string
  task: TaskType
  deleteTask: (todolistID: string, taskID: string)=> void
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean)=> void
  changeTaskTitle: (todolistID: string, taskID: string, newTitle: string)=> void
}
export const Task = React.memo (function (props:PropsType) {

  const {todolistID, task, deleteTask,changeTaskStatus, changeTaskTitle} = props;

  const onDeleteHandler = () => {
    deleteTask(todolistID, task.id)
  };
  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todolistID, task.id, e.currentTarget.checked)
  }
  const changeTitle = useCallback((newTitle: string) => {
    changeTaskTitle(todolistID, task.id, newTitle)
  }, [changeTaskTitle, todolistID, task.id])

  return (
    <li className={task.isDone ? "is-done" : ""}>
      <Checkbox onChange={changeStatus} checked={task.isDone} size="small"/>
      {/*<input onChange={changeStatus} type="checkbox" checked={task.isDone}/>*/}
      <EditableSpan title={task.title} changeCallback={changeTitle}/>
      <IconButton onClick={onDeleteHandler} size="small">
        < DeleteForeverOutlined />
      </IconButton>
      {/*<button onClick={onDeleteHandler}>X</button>*/}
    </li>
  );
});
