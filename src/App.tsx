import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML", isDone: true},
    {id: 2, title: "CSS", isDone: true},
    {id: 3, title: "React", isDone: false}
  ])
  const removeTask = (taskID: number) => {
    let tasks1 = tasks.filter(task => task.id !== taskID)
    setTasks(tasks1)
  }
  return (
    <div className="App">
      <TodoList title={"What to learn"}
                tasks={tasks}
                deleteTask={removeTask}
      />
      <TodoList title={"What to learn"}
                tasks={tasks}
                deleteTask={removeTask}
      />
    </div>
  );
}

export default App;
