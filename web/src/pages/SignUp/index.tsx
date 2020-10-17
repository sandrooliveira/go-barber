import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="logo" />

      <form>
        <h1>Register yourself</h1>

        <Input icon={FiUser} name="user" placeholder="User"></Input>
        <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
        <Input icon={FiLock} name="password" type="password" placeholder="Password"></Input>
        <Button type="submit">Register</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Back to logon page
      </a>
    </Content>
  </Container>
);

export default SignUp;
