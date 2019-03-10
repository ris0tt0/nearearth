import {combineReducers} from 'redux';
import Logger from 'js-logger';
// import { } from '../actions/ActionTypes';

function variable(state = '', action)
{
	switch(action.type)
	{
		case "dfd":
			return action.payloadl
		default:
			return state;
	}
}

const janeo = combineReducers({variable});

export default janeo;