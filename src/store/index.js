import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const nasaKey = process.env.REACT_APP_NASA_API
  ? process.env.REACT_APP_NASA_API
  : 'DEMO_KEY';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ nasaKey })))
);

export { store };
