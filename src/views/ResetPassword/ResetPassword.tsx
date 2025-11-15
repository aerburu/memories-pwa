import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Alert, Box, Button, Collapse, InputAdornment, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { supabaseClient } from 'infrastructure/supabase/supabaseClient';

import { routes } from 'views/_conf';

import * as Styled from './ResetPassword.styled';

interface State {
  password: string;
  errorPassword: string;
  isResetPasswordError?: boolean;
  isResetPasswordErrorSuccess?: boolean;
}

const initialState: State = {
  password: '',
  errorPassword: '',
  isResetPasswordError: false,
  isResetPasswordErrorSuccess: false
};

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<State>(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

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

  const isValidForm = form.errorPassword === '' && form.password.length > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm) {
      checkIsValidPassword();
      return;
    }

    try {
      await supabaseClient.auth.updateUser({ password: form.password });

      // Hide successfully reset password message after 2 seconds and redirect to signin page.
      setForm({ ...form, isResetPasswordErrorSuccess: true });
      setTimeout(() => {
        setForm({ ...form, isResetPasswordErrorSuccess: false });
        navigate(routes.SIGNIN, { replace: true });
      }, 2000);
    } catch {
      setForm({ ...initialState, isResetPasswordError: true });
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Resetea tu contraseña</Styled.Title>
      <Styled.DescriptionWrapper>
        <Typography>Elige una nueva contraseña y guárdala para resetearla.</Typography>
      </Styled.DescriptionWrapper>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          onFocus={() => setForm(prevForm => ({ ...prevForm, errorPassword: '', isResetPasswordError: false }))}
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          variant="outlined"
        />

        <Collapse in={form.isResetPasswordErrorSuccess}>
          <Alert variant="filled" severity="success" sx={{ color: '#fff' }}>
            Constraseña restablecida correctamente.
          </Alert>
        </Collapse>

        <Collapse in={form.isResetPasswordError}>
          <Alert variant="filled" severity="error">
            Se ha producido un error a la hora de restablecer la contraseña, por favor, intentelo mas tarde.
          </Alert>
        </Collapse>

        <Button color="primary" type="submit" variant="contained" sx={{ padding: '1rem' }}>
          Establecer contraseña
        </Button>
      </Box>
    </Styled.Wrapper>
  );
};
