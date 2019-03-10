import {combineReducers} from 'redux';
import Logger from 'js-logger';
import { RECIEVE_NEO_LOOKUP } from '../actions/ActionTypes';

function neoLookup(state = {},action)
{
	switch(action.type){
		case RECIEVE_NEO_LOOKUP:
			return action.payload;
		default:
			return state;
		}
}

const janeo = combineReducers({
	neoLookup
});

export default janeo;