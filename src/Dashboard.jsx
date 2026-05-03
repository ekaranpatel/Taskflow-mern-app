 import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Statsgrid from "./components/Statsgrid";
import Input from "./components/Input";
import Todolist from "./components/Todolist";
import Logout from "./components/Logout";

// This variable handles switching between your local setup and Render automatically
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3000" 
  : "https://taskflow-mern-app.onrender.com";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Updated with dynamic API_URL and backticks
    axios
      .get(`${API_URL}/api/get`, config)
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAdd = () => {
    if (!input.trim()) return;
    const token = localStorage.getItem('token');

    // Updated with dynamic API_URL and backticks
    axios
      .post(`${API_URL}/api/add`, { tasks: input }, { 
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        setInput("");
      })
      .catch((err) => console.log("Add error:", err));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    
    // Updated with dynamic API_URL and backticks
    axios
      .delete(`${API_URL}/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      .then(() => {
        setTodos(todos.filter((t) => t._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleSaveEdit = (id, newTasksText) => {
    const token = localStorage.getItem('token');

    // Updated with dynamic API_URL and backticks
    axios
      .put(`${API_URL}/api/update/${id}`, { tasks: newTasksText }, { 
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((res) => {
        setTodos(todos.map((t) => (t._id === id ? res.data : t)));
        setEditingId(null);
      })
      .catch((err) => console.error("Update error:", err));
  };

  const handleStartEdit = (id) => setEditingId(id);
  const handleCancelEdit = () => setEditingId(null);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="flex justify-end">
        <Logout />
      </div>
      <Header />
      <Statsgrid />

      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onAdd={handleAdd}
      />

      <Todolist
        todos={todos}
        editingId={editingId}
        onDelete={handleDelete}
        onStartEdit={handleStartEdit}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  );
}

export default Dashboard;
