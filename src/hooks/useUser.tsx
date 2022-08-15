/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../services/firebase';

interface IUser {
  email: string;
  password?: string;
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
      setUser({
        email: JSON.parse(userAuth),
      });
    }
  }, []);

  function createUser(user: IUser) {
    if (user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password!)
        .then((userCredential) => {
          setUser({
            email: userCredential.user.email!,
          });
          localStorage.setItem(
            '@userAuth',
            JSON.stringify(userCredential.user)
          );

          alert('Usuário criado com sucesso!');
        })
        .catch((error) => {
          alert('Erro ao criar usuário!');
          alert(error.message);
        });
    } else {
      alert('Preencha todos os campos!');
    }
  }

  function login(user: IUser) {
    if (user.email && user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password!)
        .then((userCredential) => {
          setUser({
            email: userCredential.user.email!,
          });
          localStorage.setItem(
            '@userAuth',
            JSON.stringify(userCredential.user.email)
          );
          alert('Usuário logado com sucesso!');
        })
        .catch((error) => {
          alert('Erro ao logar usuário!');
          alert(error.message);
        });
    } else {
      alert('Preencha todos os campos!');
    }
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
