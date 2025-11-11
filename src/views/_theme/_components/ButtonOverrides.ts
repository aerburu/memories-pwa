import { Theme } from '@mui/material/styles';

export const ButtonOverrides = {
  styleOverrides: {
    containedPrimary: ({ theme }: { theme: Theme }) => ({
      backgroundColor: theme.palette.primary.main, // fondo azul
      color: theme.palette.primary.contrastText, // texto blanco
      '&:hover': {
        backgroundColor: theme.palette.primary.dark // hover azul oscuro
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.primary.main, // fondo azul incluso deshabilitado
        color: theme.palette.primary.contrastText // texto blanco
      }
    })
  }
};
