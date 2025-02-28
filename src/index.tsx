import Logger from 'js-logger';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

if (process.env.NODE_ENV === 'development') {
  Logger.useDefaults();
}

const container = document.getElementById('jay-🚀');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  Logger.error('j@jonathangee.com, and the root is broken');
}
