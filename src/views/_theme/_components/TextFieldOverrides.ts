import { Theme } from '@mui/material/styles';

export const TextFieldOverrides = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      '& .MuiInputBase-input': {
        color: theme.palette.text.primary
      },

      '& .MuiInputLabel-root': {
        color: theme.palette.text.primary
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.text.secondary
      },

      '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.text.primary
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.text.primary
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.text.secondary
        }
      },

      '& .MuiInputBase-input::placeholder': {
        color: theme.palette.text.primary
      }
    })
  }
};
