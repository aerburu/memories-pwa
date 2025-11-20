import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Alert, Box, Button, Collapse, InputAdornment, Link, TextField, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { useAuth } from 'views/_functions/hooks/useAuth';

import {
  supabaseGenericErrorMessage,
  supabaseForgotPasswordGenericMessage
} from 'views/_functions/utils/supabaseErrorMessages';

import { routes } from 'views/_conf';

import * as Styled from './ForgotPassword.styled';

interface State {
  email: string;
  errorEmail: string;
  isForgotPasswordError?: boolean;
  isForgotPasswordSuccess?: boolean;
  isForgotPasswordErrorMessage: string;
}

const initialState: State = {
  email: '',
  errorEmail: '',
  isForgotPasswordError: false,
  isForgotPasswordSuccess: false,
  isForgotPasswordErrorMessage: ''
};

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<State>(initialState);
  const { forgotPassword } = useAuth();

  const onSignIn = () => navigate(routes.SIGNIN);

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

  const isValidForm = form.errorEmail === '' && form.email.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm) {
      checkIsValidEmail();
      return;
    }

    try {
      const error = await forgotPassword(form.email);

      if (error) {
        setForm({
          ...initialState,
          isForgotPasswordError: true,
          isForgotPasswordErrorMessage: supabaseForgotPasswordGenericMessage
        });
      }

      // Hide email alert sent after 3 seconds.
      setForm({ ...form, isForgotPasswordSuccess: true });
      setTimeout(() => {
        setForm({ ...form, isForgotPasswordSuccess: false });
      }, 3000);
    } catch {
      setForm({
        ...initialState,
        isForgotPasswordError: true,
        isForgotPasswordErrorMessage: supabaseGenericErrorMessage
      });
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>¿Olvidaste tu contraseña?</Styled.Title>
      <Styled.DescriptionWrapper>
        <Typography>
          Introduce tu correo electrónico y te enviaremos correo electrónico para poder restablecer la contraseña.
        </Typography>
      </Styled.DescriptionWrapper>
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
            setForm(prevForm => ({
              ...prevForm,
              errorEmail: '',
              isForgotPasswordError: false,
              isForgotPasswordErrorMessage: ''
            }))
          }
          type="text"
          value={form.email}
          variant="outlined"
        />

        <Collapse in={form.isForgotPasswordSuccess}>
          <Alert variant="filled" severity="success" sx={{ color: '#fff' }}>
            El correo electrónico para poder restablecer la contraseña se ha enviado correctamente, revisa tu bandeja de
            entrada.
          </Alert>
        </Collapse>

        <Collapse in={form.isForgotPasswordError}>
          <Alert variant="filled" severity="error">
            {form.isForgotPasswordErrorMessage}
          </Alert>
        </Collapse>

        <Button color="primary" type="submit" variant="contained" sx={{ padding: '1rem' }}>
          Enviar correo electrónico
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
