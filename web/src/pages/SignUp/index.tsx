import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getErrorInfo from '../../utils/getErrorInfo';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const onSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        user: Yup.string().required('User is mandatory'),
        email: Yup.string()
          .required('E-mail is mandatory')
          .email('Not valid email'),
        password: Yup.string().min(6, 'Min of 6 digits'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getErrorInfo(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="logo" />

        <Form ref={formRef} onSubmit={onSubmit}>
          <h1>Register yourself</h1>

          <Input icon={FiUser} name="user" placeholder="User" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
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
