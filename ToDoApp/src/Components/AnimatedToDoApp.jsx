import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Trash2, Plus } from "lucide-react";

export default function AnimatedTodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Todo List
        </h1>
        <form onSubmit={addTodo} className="flex mb-6">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow mr-2 shadow-sm"
          />
          <Button type="submit" className="shadow-sm">
            <Plus className="h-5 w-5 mr-1" />
            Add
          </Button>
        </form>
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-3"
            >
              <motion.div
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mr-3"
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-lg ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete todo"
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        {todos.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-6"
          >
            No todos yet. Add one to get started!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
