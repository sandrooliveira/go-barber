import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="logo" />

      <form>
        <h1>Welcome</h1>

        <input placeholder="E-mail"></input>
        <input type="password" placeholder="Password"></input>
        <button type="submit">Enter</button>

        <a href="forgot">Forgot my password</a>
      </form>

      <a href="login">
        <FiLogIn />
        Create account
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
