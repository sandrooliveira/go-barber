import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [ data, setData ] = useState({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoregedData() {
      const [ tokenInfo, userInfo ] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ]);

      const [ , token ] = tokenInfo;
      const [ , user ] = userInfo;

      if (!!token && !!user) {
        setData({ token, user: JSON.parse(user)});
      }

      setLoading(false);
    }

    loadStoregedData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await Api.post('sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      [ '@GoBarber:token', token ],
      [ '@GoBarber:user', JSON.stringify(user) ]
    ]);

    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(([ '@GoBarber:token', '@GoBarber:token' ]))
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Context must be used within an AuthProvider');
  }

  return context;
}
