import React from 'react';
import {
  FiArrowLeft, FiMail, FiLock, FiUser,
} from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="logo" />

        <Form initialData={{ user: 'sandro.oliveira', email: 'sandro@gmail.com' }} onSubmit={onSubmit}>
          <h1>Register yourself</h1>

          <Input icon={FiUser} name="user" placeholder="User" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input icon={FiLock} name="password" type="password" placeholder="Password" />
          <Button type="submit">Register</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Back to logon page
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
