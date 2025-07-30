import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { MUIProvider } from './providers/mui';
import { Routes } from './routes';

export const Application: FC = () => {
  Logger.info('Appplicatoin');
  return (
    <MUIProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes />
      </LocalizationProvider>
    </MUIProvider>
  );
};

export default Application;
