import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/Store";
import {addTodolistAC, changeTodoTitleAC, deleteTodolistAC} from "./redusers/TodolistsReducer";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./redusers/TasksReducer";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterType = "All" | "Active" | "Completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state=> state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state=> state.tasks)

  const dispatch = useDispatch()

  const addTodolist = useCallback((text: string) => {
    dispatch(addTodolistAC(text))
  },[dispatch])
  const deleteTodolist = useCallback((todolistID: string) => {
    dispatch(deleteTodolistAC(todolistID))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
    dispatch(changeTodoTitleAC(todolistID, newTitle))
  }, [dispatch])

//-------------

  const removeTask = useCallback((todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(todolistID, taskID))
  }, [dispatch])
  const addTask = useCallback((todolistID: string, title: string) => {
    dispatch(addTaskAC(todolistID, title))
  }, [dispatch])
  const changeStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
    dispatch(changeStatusAC(todolistID, taskID, isDone))
  }, [dispatch])
  const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, newTitle))
  }, [dispatch])

  return (
    <div className="App">
      <Container style={{maxWidth: "1300px"}}>
        <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{mr: 2}}
              >
                <Menu/>
              </IconButton>
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container style={{padding: "10px"}}>
          <h3>Add new todolist &nbsp;</h3>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map(m => {
            return (
              <Grid item key={m.id}>
                <Paper elevation={6} style={{padding: "10px"}}>
                  <TodoList
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
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
