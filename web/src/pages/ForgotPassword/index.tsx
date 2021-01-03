import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
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

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const onSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail is mandatory'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Recovery e-mail has been successfully sent',
          description:
            'We have sent you an e-mail to confirm password recovering, please check your inbox',
        });
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
            'There was an error while recovering the password, please try again',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="logo" />

          <Form ref={formRef} onSubmit={onSubmit}>
            <h1>Password Recovery</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recover
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Back to Login
          </Link>
        </AnimatedContent>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
