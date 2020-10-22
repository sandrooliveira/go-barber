import React, { createContext } from 'react';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const signIn = ({ email, password }: SignInCredentials) => {
    console.log(email, password);
  };

  return (
    <AuthContext.Provider value={{ name: 'Sandro', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
