import React, { useState, useEffect } from "react";
import "./TodoList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { Button, TextField } from "@mui/material";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  const getTasksLocal = () => {
    var loggedInUser = localStorage.getItem("loggedInUser");
    var userData = JSON.parse(localStorage.getItem("users"));
    return userData[loggedInUser]["tasks"];
  };

  const setTasksLocal = (newTasks) => {
    var loggedInUser = localStorage.getItem("loggedInUser");
    var userData = JSON.parse(localStorage.getItem("users"));
    userData[loggedInUser]["tasks"] = newTasks;
    return userData;
  };
  useEffect(() => {
    var storedTasks = getTasksLocal();
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTask !== "") {
      const newTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(newTasks);
      setNewTask("");
      localStorage.setItem("users", JSON.stringify(setTasksLocal(newTasks)));
    } else {
      alert("Enter new task");
    }
  };

  const handleTaskDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    localStorage.setItem("users", JSON.stringify(setTasksLocal(newTasks)));
    // localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleTaskEdit = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const handleEditTaskChange = (event) => {
    setEditTask(event.target.value);
  };

  const handleEditTaskSubmit = (event) => {
    event.preventDefault();
    const newTasks = [...tasks];
    newTasks[editIndex] = { ...newTasks[editIndex], text: editTask };
    setTasks(newTasks);
    setEditIndex(null);
    setEditTask("");
    // localStorage.setItem('tasks', JSON.stringify(newTasks));
    localStorage.setItem("users", JSON.stringify(setTasksLocal(newTasks)));
  };

  const handleTaskToggle = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      completed: !newTasks[index].completed,
    };
    setTasks(newTasks);
    // localStorage.setItem('tasks', JSON.stringify(newTasks));
    localStorage.setItem("users", JSON.stringify(setTasksLocal(newTasks)));
  };

  return (
    <div className="todo-list-container">
      <span className="text-xl font-semibold">My To-Do List</span>
      <form
        onSubmit={handleNewTaskSubmit}
        className="m-8 grid grid-row-4 grid-flow-col gap-4"
      >
        <TextField
          size="small"
          type="text"
          required
          placeholder="Enter Task"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {editIndex === index ? (
              <form onSubmit={handleEditTaskSubmit}>
                <TextField
                  size="small"
                  fullWidth
                  required
                  type="text"
                  value={editTask}
                  onChange={handleEditTaskChange}
                />
                <button className="ml-2" type="submit">
                  Save
                </button>
              </form>
            ) : (
              <>
                {task.text}
                <div className="task-buttons">
                  <button
                    className="task-toggle"
                    onClick={() => handleTaskToggle(index)}
                  >
                    {task.completed ? <DoneAllIcon /> : <RemoveDoneIcon />}
                  </button>
                  <button
                    className="task-edit"
                    disabled={task.completed}
                    onClick={() => handleTaskEdit(index)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="task-delete"
                    onClick={() => handleTaskDelete(index)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
