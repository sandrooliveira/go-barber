import React, { useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';
import getErrorInfo from '../../utils/getErrorInfo';

import { Container, Content, Background, AnimatedContent } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const formRef = useRef<FormHandles>(null);

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Password is mandatory'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Password confirmation is wrong',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
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
          title: 'Error on password reset',
          description:
            'There was an error while reseting your password, please try again',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={onSubmit}>
            <h1>Reset Password</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="New Password"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Password Confirmation"
            />
            <Button type="submit">Change Password</Button>
          </Form>
        </AnimatedContent>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
