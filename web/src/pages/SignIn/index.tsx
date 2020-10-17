import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="logo" />

      <form>
        <h1>Welcome</h1>

        <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
        <Input icon={FiLock} name="password" type="password" placeholder="Password"></Input>
        <Button type="submit">Enter</Button>

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
