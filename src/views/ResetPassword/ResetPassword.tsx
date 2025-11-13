import { useState } from 'react';

import { Box, Button, InputAdornment, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Styled from './ResetPassword.styled';

// TODO: Como gestionar el isSubmitting y el isLoginError

interface State {
  password: string;
  errorPassword: string;
}

const initialState: State = {
  password: '',
  errorPassword: ''
};
export const ResetPassword: React.FC = () => {
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

    console.log('OK');
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Cambia tu contraseña</Styled.Title>
      <Styled.DescriptionWrapper>
        <label>Elige una nueva contraseña y guárdala para continuar.</label>
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
          onFocus={() => setForm(prevForm => ({ ...prevForm, errorPassword: '', isLoginError: false }))}
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          variant="outlined"
        />

        <Button color="primary" type="submit" variant="contained" sx={{ padding: '1rem' }}>
          Establecer contraseña
        </Button>
      </Box>
    </Styled.Wrapper>
  );
};
