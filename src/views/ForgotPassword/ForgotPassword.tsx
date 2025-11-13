import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { routes } from 'views/_conf';

import * as Styled from './ForgotPassword.styled';

// TODO: Como gestionar el isSubmitting y el isLoginError

interface State {
  email: string;
  errorEmail: string;
}

const initialState: State = {
  email: '',
  errorEmail: ''
};
export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<State>(initialState);

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

    console.log('OK');
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>¿Olvidaste tu contraseña?</Styled.Title>
      <Styled.DescriptionWrapper>
        <label>Introduce tu correo electrónico y te enviaremos un código para restablecer la contraseña.</label>
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
          onFocus={() => setForm(prevForm => ({ ...prevForm, errorEmail: '', isLoginError: false }))}
          type="text"
          value={form.email}
          variant="outlined"
        />

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
