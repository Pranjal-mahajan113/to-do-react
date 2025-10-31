import React, { useState } from "react";
import './App.css';



const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // 🔹 jiska edit ho raha hai uska index
  const [editText, setEditText] = useState(""); // 🔹 input box me dikhane ke liye text

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // 📝 Edit start hone par
  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  // 💾 Save edit hone ke baad
  const saveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editText;
    setTodos(updatedTodos);
    setEditIndex(null); // edit mode off
    setEditText("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo List App</h1>
      <input
        type="text"
        placeholder="Enter your task...."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {editIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo}</span>
                <button onClick={() => startEdit(index)}>✏️ Edit</button>
                <button onClick={() => deleteTodo(index)}>❌ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
