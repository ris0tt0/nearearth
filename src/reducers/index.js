import {combineReducers} from 'redux';
import Logger from 'js-logger';
import { RECIEVE_NEO_LOOKUP, RECIEVE_NEO_BROWSE, RECIEVE_NEO_FEED } from '../actions/ActionTypes';

function neoLookup(state = {},action)
{
	switch(action.type){
		case RECIEVE_NEO_LOOKUP:
			return action.payload;
		default:
			return state;
		}
}

function neoBrowse(state = {}, action)
{
	switch(action.type)
	{
		case RECIEVE_NEO_BROWSE:
			return action.payload;
		default:
			return state;
	}
}

function neoFeed(state = {}, action)
{
	switch(action.type)
	{
		case RECIEVE_NEO_FEED:
			return action.payload;
		default:
			return state;
	}
}

const janeo = combineReducers({
	neoFeed,
	neoBrowse,
	neoLookup,
});

export default janeo;