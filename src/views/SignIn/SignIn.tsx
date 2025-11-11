import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import * as Styled from './SignIn.styled';

// TODO: Como gestionar el isSubmitting y el isLoginError

interface State {
  email: string;
  password: string;
  errorEmail: string;
  errorPassword: string;
  isSubmitting?: boolean;
  isLoginError?: boolean;
}

const initialState: State = {
  email: '',
  password: '',
  errorEmail: '',
  errorPassword: '',
  isSubmitting: false,
  isLoginError: false
};

export const SignIn: React.FC = () => {
  const [form, setForm] = useState<State>(initialState);

  const validateEmail = (email: string): string => {
    const validateFormat = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email.trim()) return 'El email es obligatorio';
    if (!validateFormat(email)) return 'El email no es válido';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) return 'La contraseña es obligatoria';
    return '';
  };

  const validateField = (field: 'email' | 'password') => {
    const error = field === 'email' ? validateEmail(form.email) : validatePassword(form.password);

    setForm(prev => ({
      ...prev,
      [field === 'email' ? 'errorEmail' : 'errorPassword']: error
    }));

    return error;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateField('email');
    const passwordError = validateField('password');

    console.log('emailError -> ', emailError);
    console.log('passwordError -> ', passwordError);

    if (emailError || passwordError) return;

    console.log('OK');
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Iniciar Sesión</Styled.Title>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          error={Boolean(form.errorEmail)}
          helperText={form.errorEmail}
          label="Correo electrónico"
          onBlur={() => validateField('email')}
          onChange={e => setForm({ ...form, email: e.target.value })}
          onFocus={() => setForm(prevForm => ({ ...prevForm, errorEmail: '', isLoginError: false }))}
          placeholder=""
          type="text"
          value={form.email}
          variant="outlined"
        />
        <TextField
          autoComplete="password"
          error={Boolean(form.errorPassword)}
          helperText={form.errorPassword}
          label="Contraseña"
          onBlur={() => validateField('password')}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onFocus={() => setForm(prevForm => ({ ...prevForm, errorPassword: '', isLoginError: false }))}
          type="password"
          value={form.password}
          variant="outlined"
        />

        {!form.isSubmitting && form.isLoginError && (
          <Styled.FormErrorMessage data-cy="login-error-text">
            Error en el inicio de sesión, por favor intentelo de nuevo
          </Styled.FormErrorMessage>
        )}

        <Button color="primary" type="submit" variant="contained" sx={{ padding: '1rem' }}>
          Iniciar Sesión
        </Button>
      </Box>
    </Styled.Wrapper>
  );
};
