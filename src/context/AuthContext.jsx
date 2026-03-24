import { createContext, useContext, useState } from 'react';
import { login, register, logout, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    console.log('User connecté :', data.user)
    setUser(data.user);
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await register(name, email, password);
    setUser(data.user);
    return data;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);