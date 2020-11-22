import React from 'react';

import { AuthenticationProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthenticationProvider>{ children }</AuthenticationProvider>
);

export default AppProvider;
