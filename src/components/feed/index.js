import {connect} from 'react-redux';

import Logger from 'js-logger'
import {NeoFeed} from './NeoFeed';
import { neoFeedLinks, neoFeedNearEarthObjects, neoFeedIsFetching } from '../../selectors';

const mapStateToProps = state =>
{
	const links = neoFeedLinks(state);
	const neo = neoFeedNearEarthObjects(state);
	const isFetching = neoFeedIsFetching(state);

	Logger.info('index-NeoFeed');
	Logger.info(links);
	Logger.info(neo);

	return {neo,links,isFetching};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onSelectId: id => Logger.info(id)
	}
}

const NeoFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NeoFeed);

export default NeoFeedContainer;