import { createTheme } from '@mui/material/styles';
import { ButtonOverrides } from './_components/ButtonOverrides';
import { TextFieldOverrides } from './_components/TextFieldOverrides';
import { palette } from './palette';

export const theme = createTheme({
  palette,
  components: {
    MuiButton: ButtonOverrides,
    MuiTextField: TextFieldOverrides
  }
});
