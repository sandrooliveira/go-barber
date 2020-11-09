import React from 'react';
import { Image } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Faça seu logon</Title>

      <Input placeholder="Email" name="email" icon="mail" />
      <Input placeholder="Password" name="password" icon="lock" />

      <Button>Enter</Button>
    </Container>
  );
};

export default SignIn;
