import React, { useState } from "react";

function AddToDo({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

export default AddToDo;
