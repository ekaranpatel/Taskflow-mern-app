import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Statsgrid from "./components/Statsgrid";
import Input from "./components/Input";
import Todolist from "./components/Todolist";
import Logout from "./components/Logout"
function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  // const BASE_URL = "http://localhost:3001";
// 1. Get the token from storage
  
  useEffect(() => {
    const token = localStorage.getItem('token'); 

  // 2. Setup the config with headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    axios
      .get(`http://localhost:3000/api/get`,config)
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAdd = () => {
    if (!input.trim()) return;
const token = localStorage.getItem('token')
    axios
      .post(`http://localhost:3000/api/add`, { tasks: input },{ 
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
    const token = localStorage.getItem('token'); // 1. Get token
    
    axios
      .delete(`http://localhost:3000/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // 2. Send token with request
        }
      }) 
      .then(() => {
        setTodos(todos.filter((t) => t._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };
  const handleSaveEdit = (id, newTasksText) => {
    const token = localStorage.getItem('token')
    axios
      .put(`http://localhost:3000/api/update/${id}`, { tasks: newTasksText },{ 
        headers: {
          Authorization: `Bearer ${token}` // The Authorization header
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
    ><div className="flex justify-end">
<Logout /></div>
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
