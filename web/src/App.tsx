import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes/index';

import ToastContainer from './components/ToastContainer';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes>
        <SignIn />
      </Routes>
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
