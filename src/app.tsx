import Logger from 'js-logger';
import React, { FC } from 'react';
import { MUIProvider } from './providers/mui';
import { Routes } from './routes';

export const Application: FC = () => {
  Logger.info('Appplicatoin');
  return (
    <MUIProvider>
      <div>welcome to the neo applications</div>
      <Routes />
    </MUIProvider>
  );
};

export default Application;
