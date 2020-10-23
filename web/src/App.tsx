import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthenticationProvider } from './hooks/AuthContext';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <>
    <AuthenticationProvider>
      <SignIn />
    </AuthenticationProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
