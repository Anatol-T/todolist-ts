import React, {useCallback, useState} from 'react';
import {TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import {DeleteForeverOutlined} from "@mui/icons-material";
import {Task} from "./task";

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

export const TodoList = React.memo(function (
  {
    title, todolistID, tasks, deleteTodolist, changeTodolistTitle, addTask,
    deleteTask, changeTaskStatus, changeTaskTitle
  }: PropsType) {
  console.log("Todolist called")
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
  const changeTodolistTitleHandler = useCallback((newTitle: string)=> {
    changeTodolistTitle(todolistID,newTitle)
  }, [changeTodolistTitle, todolistID])
  const addTaskHandler = useCallback((text: string) => {
    addTask(todolistID, text);
  }, [todolistID, addTask])


  const tasksJSX = filteredTasks.map(task => {
    return (
    <Task
      key={task.id}
      todolistID={todolistID}
      task={task}
      deleteTask={deleteTask}
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}/>
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
})
