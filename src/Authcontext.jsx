import React, { createContext, useState, useContext, useEffect } from 'react';
 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info or token

 

  useEffect(() => {
   
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    console.log(token)
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };
function logout(){
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
 }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);