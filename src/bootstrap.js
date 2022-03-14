import Logger from 'js-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fetchNEOBrowse, fetchNEOFeed } from './actions';
import App from './App';
import './index.css';
import { store } from './store';

Logger.useDefaults();

// store.dispatch(fetchNEOLookup('3542519'));
store.dispatch(fetchNEOBrowse());

// auto load today.
const d = new Date();
store.dispatch(fetchNEOFeed(d, d));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('g-nearearth')
);
