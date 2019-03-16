import {connect} from 'react-redux';
import Logger from 'js-logger'
import {NeoLookup} from './NeoLookup'
import { neoLookupLinks, neoLookupResponse, neoLookupIsFetching } from '../../selectors';

const mapStateToProps = state =>
{
	const response = neoLookupResponse(state);
	const links = neoLookupLinks(state);
	const isFetching = neoLookupIsFetching(state);

	return {response,isFetching,links};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onSelectId: id => Logger.info(id)
	}
}

const NeoLookupContainer = connect(mapStateToProps,mapDispatchToProps)(NeoLookup);

export default NeoLookupContainer;