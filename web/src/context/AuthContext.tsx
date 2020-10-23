import React, { createContext } from 'react';
import Api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const signIn = async ({ email, password }: SignInCredentials) => {
    const response = await Api.post('sessions', {
      email,
      password,
    });

    console.log(response);
  };

  return (
    <AuthContext.Provider value={{ name: 'Sandro', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
