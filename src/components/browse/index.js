import {connect} from 'react-redux';
import Logger from 'js-logger'
import {NeoBrowse} from './NeoBrowse';
import { neoBrowseNearEarthObjectsList, neoBrowseLinks, neoBrowsePage, neoBrowseIsFetching } from '../../selectors';

const mapStateToProps = state =>
{
	const neos = neoBrowseNearEarthObjectsList(state);
	const links = neoBrowseLinks(state);
	const page = neoBrowsePage(state);
	const isFetching = neoBrowseIsFetching(state);

	return {neos,links,page,isFetching};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onSelectId: id => Logger.info(id)
	}
}

const NeoFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NeoBrowse);

export default NeoFeedContainer;