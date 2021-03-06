import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import Logger from 'js-logger';
import { fetchNEOLookup, fetchNEOBrowse, fetchNEOFeed } from './actions';

Logger.useDefaults();

// store.dispatch(fetchNEOLookup('3542519'));
store.dispatch(fetchNEOBrowse());

// auto load today.
const d = new Date();
store.dispatch(fetchNEOFeed(d,d));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
