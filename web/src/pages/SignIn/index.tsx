import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';
import getErrorInfo from '../../utils/getErrorInfo';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail is mandatory'),
          password: Yup.string().required('Password is mandatory'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getErrorInfo(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Not possible to connect to the API',
          description:
            'No data was retrieved, please contact system administrator',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />

        <Form ref={formRef} onSubmit={onSubmit}>
          <h1>Welcome</h1>

          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Enter</Button>

          <a href="forgot">Forgot my password</a>
        </Form>

        <Link to="/signup">
          <FiLogIn />
          Create account
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
