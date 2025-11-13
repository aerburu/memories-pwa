import { Components, Theme } from '@mui/material/styles';

export const TextFieldOverrides: Components<Theme>['MuiTextField'] = {
  variants: [
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
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
            borderColor: theme.palette.background.paper
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
  ]
};
