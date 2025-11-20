import { Box } from '@mui/material';

import { Navbar } from './_components';

interface Props {
  children: React.ReactNode;
}

export const PrivateMainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};
