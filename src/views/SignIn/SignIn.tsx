import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Alert, Box, Button, Collapse, Divider, InputAdornment, Link, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { supabaseClient } from 'infrastructure/supabase/supabaseClient';

import { routes } from 'views/_conf';

import * as Styled from './SignIn.styled';

interface State {
  email: string;
  password: string;
  errorEmail: string;
  errorPassword: string;
  isSubmitting?: boolean;
  isSignInError?: boolean;
  signInErrorMessage: string;
}

const initialState: State = {
  email: '',
  password: '',
  errorEmail: '',
  errorPassword: '',
  isSubmitting: false,
  isSignInError: false,
  signInErrorMessage: ''
};

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<State>(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const onForgotPassword = () => navigate(routes.FORGOT_PASSWORD);

  const onSignUp = () => navigate(routes.SIGNUP);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const checkIsValidEmail = () => {
    const validateFormat = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setForm(prevForm => {
      return {
        ...prevForm,
        errorEmail: !form.email.trim()
          ? 'El email es obligatorio'
          : !validateFormat(form.email)
          ? 'El email no es válido'
          : ''
      };
    });
  };

  const checkIsValidPassword = () =>
    setForm(prevForm => {
      return { ...prevForm, errorPassword: !form.password.trim() ? 'La contraseña es obligatoria' : '' };
    });

  const isValidForm =
    form.errorEmail === '' && form.errorPassword === '' && form.email.length > 0 && form.password.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm) {
      checkIsValidEmail();
      checkIsValidPassword();
      return;
    }

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: form.email,
        password: form.password
      });

      if (error?.message == 'Invalid login credentials') {
        setForm({
          ...initialState,
          email: form.email,
          isSignInError: true,
          signInErrorMessage: 'El correo electrónico del usuario o la contraseña son incorrectos.'
        });
        return;
      }

      // TODO: Redirigir y autentication
    } catch {
      setForm({
        ...initialState,
        email: form.email,
        isSignInError: true,
        signInErrorMessage: 'Se ha producido un error a la hora de iniciar sesión, por favor, intentelo mas tarde.'
      });
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Iniciar Sesión</Styled.Title>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          error={Boolean(form.errorEmail)}
          helperText={form.errorEmail}
          label={!form.email.trim() ? '' : 'Correo electrónico'}
          placeholder="Correo electrónico"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              )
            }
          }}
          onBlur={() => checkIsValidEmail()}
          onChange={e => setForm({ ...form, email: e.target.value })}
          onFocus={() =>
            setForm(prevForm => ({ ...prevForm, errorEmail: '', isSignInError: false, signInErrorMessage: '' }))
          }
          type="text"
          value={form.email}
          variant="outlined"
        />
        <TextField
          autoComplete="password"
          error={Boolean(form.errorPassword)}
          helperText={form.errorPassword}
          label={!form.password.trim() ? '' : 'Contraseña'}
          placeholder="Contraseña"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment onClick={handleClickShowPassword} position="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputAdornment>
              )
            }
          }}
          onBlur={() => checkIsValidPassword()}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onFocus={() =>
            setForm(prevForm => ({ ...prevForm, errorPassword: '', isSignInError: false, signInErrorMessage: '' }))
          }
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          variant="outlined"
        />

        <Collapse in={form.isSignInError}>
          <Alert variant="filled" severity="error">
            {form.signInErrorMessage}
          </Alert>
        </Collapse>

        <Button color="primary" type="submit" variant="contained" sx={{ padding: '1rem' }}>
          Iniciar Sesión
        </Button>

        <Link onClick={onForgotPassword} underline="none" sx={{ alignSelf: 'end' }}>
          ¿Has olvidado tu contraseña
        </Link>

        <Divider> o </Divider>

        <Button color="secondary" startIcon={<GoogleIcon />} variant="contained" sx={{ padding: '1rem' }}>
          Iniciar sesión con Google
        </Button>

        <Styled.SignUpWrapper>
          <Typography>¿No tienes cuenta?</Typography>
          <Link onClick={onSignUp} underline="none">
            ¡Regístrate!
          </Link>
        </Styled.SignUpWrapper>
      </Box>
    </Styled.Wrapper>
  );
};
