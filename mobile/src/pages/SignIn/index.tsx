import React, { useRef, useCallback } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getErrorInfo from '../../utils/getErrorInfo';

import logoImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(
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

        //await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getErrorInfo(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Not possible to connect to the API',
          'No data was retrieved, please contact system administrator'
        );
      }
    },
    [],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <Title>Faça seu logon</Title>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                keyboardType="email-address"
                name="email"
                icon="mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />

              <Input
                ref={passwordRef}
                placeholder="Password"
                name="password"
                icon="lock"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>Enter</Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Forgot password</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create Account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
