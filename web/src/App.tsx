import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthenticationProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthenticationProvider>
      <SignIn />
    </AuthenticationProvider>
    <GlobalStyle />
  </>
);

export default App;
