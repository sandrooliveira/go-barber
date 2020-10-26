import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastInfo {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(toast: Omit<ToastInfo, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastInfo, 'id'>) => {
      const newToast = {
        id: uuid(),
        title,
        type,
        description,
      };

      setToasts(state => [...state, newToast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Context must be within an ToastProvider');
  }

  return context;
}
