import Logger from 'js-logger';
import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { NeoCommandsImpl } from './commands/neo';

const App = lazy(() => import('./app'));

const node = document.getElementById('jay-neo');

if (process.env.NODE_ENV === 'development') {
  Logger.useDefaults();
}

if (node) {
  NeoCommandsImpl.getInstance()
    .init()
    .then(() => {
      const root = createRoot(node);

      root.render(<App />);
    });
}
