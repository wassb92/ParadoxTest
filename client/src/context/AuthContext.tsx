import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  progress: number;
  enrolledCourses: number[];
}

export interface IAuthContext {
  authToken: string | null;
  user: IUser | null;
  login: (token: string, userData: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  authToken: null,
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const logout = (): void => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
  };

  const login = (token: string, userData: IUser): void => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    setUser(userData);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
        try {
          const { data } = await axios.get("http://localhost:5000/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
        } catch (error) {
          logout();
        }
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
