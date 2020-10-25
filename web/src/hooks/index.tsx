import React from 'react';

import { AuthenticationProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthenticationProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthenticationProvider>
);

export default AppProvider;
