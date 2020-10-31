import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import { Container, Content, Background, AnimatedContent } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

import getErrorInfo from '../../utils/getErrorInfo';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is mandatory'),
          email: Yup.string()
            .required('E-mail is mandatory')
            .email('Not valid email'),
          password: Yup.string().min(6, 'Min of 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'You have successfully registered',
          description: 'You can now logon on GoBarber app',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getErrorInfo(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Register error',
          description: 'There was an issue on registering, please try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={onSubmit}>
            <h1>Register yourself</h1>

            <Input icon={FiUser} name="name" placeholder="Name" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Register</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to logon page
          </Link>
        </AnimatedContent>
      </Content>
    </Container>
  );
};

export default SignUp;
