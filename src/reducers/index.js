import { combineReducers } from 'redux';
import {
  DATE_NEO_FEED,
  RECIEVE_NEO_BROWSE,
  RECIEVE_NEO_FEED,
  RECIEVE_NEO_LOOKUP,
  REQUEST_NEO_BROWSE,
  REQUEST_NEO_FEED,
  REQUEST_NEO_LOOKUP,
} from '../actions/ActionTypes';

function neoLookup(state = {}, action) {
  switch (action.type) {
    case RECIEVE_NEO_LOOKUP:
      return action.payload;
    default:
      return state;
  }
}

function neoBrowse(state = {}, action) {
  switch (action.type) {
    case RECIEVE_NEO_BROWSE:
      return action.payload;
    default:
      return state;
  }
}

function neoFeed(state = {}, action) {
  switch (action.type) {
    case RECIEVE_NEO_FEED:
      return action.payload;
    default:
      return state;
  }
}

function isFetchingFeed(state = true, action) {
  switch (action.type) {
    case REQUEST_NEO_FEED:
      return action.payload;
    default:
      return state;
  }
}

function isFetchingBrowse(state = true, action) {
  switch (action.type) {
    case REQUEST_NEO_BROWSE:
      return action.payload;
    default:
      return state;
  }
}

function isFetchingLookup(state = true, action) {
  switch (action.type) {
    case REQUEST_NEO_LOOKUP:
      return action.payload;
    default:
      return state;
  }
}

function neoFeedDate(state = new Date(), action) {
  switch (action.type) {
    case DATE_NEO_FEED:
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  //Flags for api call.
  isFetchingFeed,
  isFetchingBrowse,
  isFetchingLookup,
  //
  neoFeedDate,
  // api results normalized
  neoFeed,
  neoBrowse,
  neoLookup,
});

export default rootReducer;
