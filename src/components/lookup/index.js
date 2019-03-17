import {connect} from 'react-redux';
import Logger from 'js-logger'
import {NeoLookup} from './NeoLookup'
import { neoLookupLinks, neoLookupResponse, neoLookupIsFetching } from '../../selectors';

const mapStateToProps = state =>
{
	const links = neoLookupLinks(state);
	const isFetching = neoLookupIsFetching(state);

	return {isFetching,links};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onSelectId: id => Logger.info(id)
	}
}

const NeoLookupContainer = connect(mapStateToProps,mapDispatchToProps)(NeoLookup);

export default NeoLookupContainer;