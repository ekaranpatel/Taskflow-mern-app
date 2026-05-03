import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './Authcontext';
import Dashboard from "./Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      {!user ? (
        <>
         
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
         
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;