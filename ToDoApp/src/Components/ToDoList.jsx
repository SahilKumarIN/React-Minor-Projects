import React from "react";

function ToDoList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <span
            className={task.completed ? "task-completed" : "task"}
            onClick={() => toggleTask(index)}
          >
            {task.text}
          </span>
          <button className="delete-button" onClick={() => deleteTask(index)}>
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
