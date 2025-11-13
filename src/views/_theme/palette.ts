import { PaletteOptions } from '@mui/material';

export const palette: PaletteOptions = {
  mode: 'dark', // 👈 indica explícitamente que es un tema oscuro
  primary: {
    main: '#1976d2', // Azul principal (botones, links, énfasis)
    light: '#63a4ff', // Hover / focus
    dark: '#004ba0', // Active / pressed
    contrastText: '#ffffff' // Texto dentro de botones
  },
  secondary: {
    main: '#9c27b0', // Un púrpura que combina muy bien con azul y fondo oscuro
    light: '#d05ce3',
    dark: '#6a0080',
    contrastText: '#ffffff'
  },
  background: {
    default: '#1C1C1C', // Fondo principal válido
    paper: '#464646' // Fondos de tarjetas, modales, inputs
  },
  text: {
    primary: '#ffffff', // Texto principal
    secondary: '#1976d2' // Texto de énfasis o links
  }
};
