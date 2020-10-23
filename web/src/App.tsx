import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthenticationProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthenticationProvider>
      <SignIn />
    </AuthenticationProvider>
    <GlobalStyle />
  </>
);

export default App;
