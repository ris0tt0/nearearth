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

store.dispatch(fetchNEOLookup('3542519'));
store.dispatch(fetchNEOBrowse());

const start = new Date('2015-09-07');
const end = new Date('2015-09-14');

store.dispatch(fetchNEOFeed(start,end));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
