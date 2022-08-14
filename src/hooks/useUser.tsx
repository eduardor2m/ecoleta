import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../services/firebase';

interface IUser {
  email: string;
  password: string;
}

interface UserContextData {
  user: IUser;
  createUser: (user: IUser) => void;
  login: (user: IUser) => void;
  logout: () => void;
  deleteUser: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface IUserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<IUserProviderProps> = ({
  children,
}: IUserProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const userAuth = localStorage.getItem('@userAuth');
    if (userAuth) {
      setUser(JSON.parse(userAuth));
    }
  }, []);

  function createUser(user: IUser) {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        alert('Usuário criado com sucesso!');
        setUser({
          email: userCredential.user.email!,
          password: userCredential.user.uid,
        });
        localStorage.setItem('@userAuth', JSON.stringify(userCredential.user));
      })
      .catch((error) => {
        alert('Erro ao criar usuário!');
        alert(error.message);
      });
  }

  function login(user: IUser) {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        alert('Usuário logado com sucesso!');
        setUser({
          email: userCredential.user.email!,
          password: userCredential.user.uid,
        });
        localStorage.setItem('@userAuth', JSON.stringify(userCredential.user));
      })
      .catch((error) => {
        alert('Erro ao logar usuário!');
        alert(error.message);
      });
  }

  function logout() {
    auth.signOut();
    localStorage.removeItem('@userAuth');
    setUser({} as IUser);
    alert('Usuário deslogado com sucesso!');
  }

  function deleteUser() {
    auth.currentUser?.delete();
    localStorage.removeItem('@userAuth');
    setUser({} as IUser);
    alert('Usuário deletado com sucesso!');
  }

  return (
    <UserContext.Provider
      value={{ user, createUser, login, logout, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
