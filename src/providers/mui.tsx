import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

const MUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    colorSchemes: {
      light: {
        palette: {
          background: {
            paper: '#ffffff',
          },
        },
      },
      dark: {
        palette: {
          background: {
            paper: '#1a1a1a',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { MUIProvider };
