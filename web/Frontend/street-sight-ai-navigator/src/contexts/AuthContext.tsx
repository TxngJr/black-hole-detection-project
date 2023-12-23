import { useState, createContext, ReactNode, useEffect } from 'react';
import { IUser } from '../interfaces/user.interface';
import { ApiResponse } from '../interfaces/gobal.interface';
import { selfApi } from '../services/user.service';

interface AuthContextType {
  user: IUser | null;
  saveUser: (token: string) => void;
  removeUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  saveUser: () => { },
  removeUser: () => { }
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token: string | null = await localStorage.getItem('token');
      if (!token) {
        setUser(null);
      }
      const response: ApiResponse<IUser> = await selfApi(token!);
      if (!response.status) {
        return removeUser();
      }
      return setUser({ ...response.data, token });
    }
    checkToken();
  }, []);


  const saveUser = async (token: string) => {
    try {
      await localStorage.setItem('token', token);
      const response: ApiResponse<IUser> = await selfApi(token!);
      if (!response.status) {
        return removeUser();
      }
      return setUser({ ...response.data, token });
    } catch (error) {
      console.log(error)
    }
  }

  const removeUser = async () => {
    try {
      await localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}