import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Alert, Box, Button, Collapse, InputAdornment, Link, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useAuth } from 'views/_functions/hooks/useAuth';

import {
  supabaseErrorMessages,
  supabaseGenericErrorMessage,
  supabaseSignUpGenericMessage
} from 'views/_functions/utils/supabaseErrorMessages';

import { routes } from 'views/_conf';

import * as Styled from './SignUp.styled';

interface State {
  username: string;
  email: string;
  password: string;
  errorUsername: string;
  errorEmail: string;
  errorPassword: string;
  isSignUpError?: boolean;
  signUpErrorMessage: string;
}

const initialState: State = {
  username: '',
  email: '',
  password: '',
  errorUsername: '',
  errorEmail: '',
  errorPassword: '',
  isSignUpError: false,
  signUpErrorMessage: ''
};

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<State>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();

  const onSignIn = () => navigate(routes.SIGNIN);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const checkIsValidUsername = () =>
    setForm(prevForm => {
      return { ...prevForm, errorUsername: !form.username.trim() ? 'El nombre de usuario es obligatorio' : '' };
    });

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

  const checkIsValidPassword = () => {
    const validatePasswordRegex = (password: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()[\]{}^#\-_=+|;:,.<>]).{8,}$/;
      return passwordRegex.test(password);
    };

    setForm(prevForm => {
      return {
        ...prevForm,
        errorPassword: !form.password.trim()
          ? 'La contraseña es obligatoria'
          : !validatePasswordRegex(form.password)
          ? 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial'
          : ''
      };
    });
  };

  const isValidForm =
    form.errorUsername === '' &&
    form.errorEmail === '' &&
    form.errorPassword === '' &&
    form.username.length > 0 &&
    form.email.length > 0 &&
    form.password.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm) {
      checkIsValidUsername();
      checkIsValidEmail();
      checkIsValidPassword();
      return;
    }

    try {
      const error = await signUp(form.email, form.password, form.username);

      if (error) {
        const translatedMessage = supabaseErrorMessages[error.message] || supabaseSignUpGenericMessage;
        setForm({
          ...initialState,
          username: form.username,
          email: form.email,
          isSignUpError: true,
          signUpErrorMessage: translatedMessage
        });
        return;
      }

      navigate(routes.SIGNIN, { replace: true });
    } catch (error) {
      console.error('Signup unexpected error:', error);

      setForm({
        ...initialState,
        username: form.username,
        email: form.email,
        isSignUpError: true,
        signUpErrorMessage: supabaseGenericErrorMessage
      });
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Crear Cuenta</Styled.Title>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          error={Boolean(form.errorUsername)}
          helperText={form.errorUsername}
          label={!form.username.trim() ? '' : 'Nombre de usuario'}
          placeholder="Nombre de usuario"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }
          }}
          onBlur={() => checkIsValidUsername()}
          onChange={e => setForm({ ...form, username: e.target.value })}
          onFocus={() =>
            setForm(prevForm => ({ ...prevForm, errorUsername: '', isSignUpError: false, signUpErrorMessage: '' }))
          }
          type="text"
          value={form.username}
          variant="outlined"
        />
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
            setForm(prevForm => ({ ...prevForm, errorEmail: '', isSignUpError: false, signUpErrorMessage: '' }))
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
            setForm(prevForm => ({ ...prevForm, errorPassword: '', isSignUpError: false, signUpErrorMessage: '' }))
          }
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          variant="outlined"
        />

        <Collapse in={form.isSignUpError}>
          <Alert variant="filled" severity="error">
            {form.signUpErrorMessage}
          </Alert>
        </Collapse>

        <Button color="primary" type="submit" variant="contained" sx={{ padding: '1rem' }}>
          Registrate
        </Button>

        <Styled.SignInWrapper>
          <Typography>¿Tienes ya una cuenta?</Typography>
          <Link onClick={onSignIn} underline="none">
            Inicia sesión
          </Link>
        </Styled.SignInWrapper>
      </Box>
    </Styled.Wrapper>
  );
};
