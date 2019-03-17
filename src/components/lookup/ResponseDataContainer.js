import {connect} from 'react-redux';
import Logger from 'js-logger';
import {ResponseData} from './ResponseData'
import { neoLookupResponse } from '../../selectors';

const mapStateToProps = state =>
{
	const response = neoLookupResponse(state);
	
	return {response};
}

const ResponseDataContainer = connect(mapStateToProps)(ResponseData);

export default ResponseDataContainer;