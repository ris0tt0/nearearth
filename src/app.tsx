import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import React, { FC } from 'react';
import { MUIProvider } from './providers/mui';
import { Routes } from './routes';
import { CommandsProvider } from './providers/commands';

export const Application: FC = () => {
  return (
    <MUIProvider>
      <CommandsProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes />
        </LocalizationProvider>
      </CommandsProvider>
    </MUIProvider>
  );
};

export default Application;
