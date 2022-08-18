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
  createUser: (user: IUser) => Promise<void>;
  login: (user: IUser) => Promise<void>;
  logout: () => Promise<void>;
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
    const authenticatedUserEmail = localStorage.getItem(
      '@ecoleta:authenticatedUser'
    );
    if (authenticatedUserEmail) {
      setUser({
        email: JSON.parse(authenticatedUserEmail),
      });
    }
  }, []);

  async function createUser(user: IUser) {
    if (user.email && user.password) {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      if (createdUser.user.email) {
        setUser({
          email: createdUser.user.email,
        });
        localStorage.setItem(
          '@ecoleta:authenticatedUser',
          JSON.stringify(createdUser.user.email)
        );
      } else {
        alert('Erro ao criar usuário');
      }
    } else {
      alert('Preencha todos os campos');
    }
  }

  async function login(user: IUser) {
    if (user.email && user.password) {
      const authenticatedUser = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      if (authenticatedUser.user.email) {
        setUser({
          email: authenticatedUser.user.email,
        });
        localStorage.setItem(
          '@ecoleta:authenticatedUser',
          JSON.stringify(authenticatedUser.user.email)
        );
        window.location.href = `/register`;
      } else {
        alert('Usuário não encontrado!');
      }
    } else {
      alert('Preencha todos os campos!');
    }
  }

  async function logout() {
    auth.signOut();
    localStorage.removeItem('@ecoleta:authenticatedUser');
    setUser({} as IUser);
    alert('Usuário deslogado com sucesso!');
  }

  return (
    <UserContext.Provider value={{ user, createUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
