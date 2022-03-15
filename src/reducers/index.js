import produce from 'immer';
import { combineReducers } from 'redux';
import {
  DATE_NEO_FEED,
  RECIEVE_NEO_BROWSE,
  RECIEVE_NEO_FEED,
  RECIEVE_NEO_LOOKUP,
  REQUEST_NEO_BROWSE,
  REQUEST_NEO_FEED,
  REQUEST_NEO_LOOKUP,
} from '../actions';

const jneo = produce(
  (draft, action) => {
    switch (action.type) {
      case RECIEVE_NEO_LOOKUP:
        draft.neoLookup = action.payload;
        break;
      case RECIEVE_NEO_BROWSE:
        draft.neoBrowse = action.payload;
        break;
      case RECIEVE_NEO_FEED:
        draft.neoFeed = action.payload;
        break;
      case REQUEST_NEO_FEED:
        draft.isFetchingFeed = action.payload;
        break;
      case REQUEST_NEO_BROWSE:
        draft.isFetchingBrowse = action.payload;
        break;
      case REQUEST_NEO_LOOKUP:
        draft.isFetchingLookup = action.payload;
        break;
      case DATE_NEO_FEED:
        draft.neoFeedDate = action.payload;
        break;
    }
  },
  {
    isFetchingFeed: false,
    isFetchingBrowse: false,
    isFetchingLookup: false,
    //
    neoFeedDate: new Date(),
    // api results normalized
    neoFeed: {},
    neoBrowse: {},
    neoLookup: {},
  }
);

const rootReducer = combineReducers({
  jneo,
});

export default rootReducer;
