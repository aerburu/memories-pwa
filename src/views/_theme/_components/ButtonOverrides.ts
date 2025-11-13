import { Components, Theme } from '@mui/material/styles';

export const ButtonOverrides: Components<Theme>['MuiButton'] = {
  defaultProps: {
    style: {
      textTransform: 'none'
    }
  },
  variants: [
    {
      props: { variant: 'contained', color: 'primary' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      })
    },
    {
      props: { variant: 'contained', color: 'secondary' },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText
      })
    }
  ]
};
