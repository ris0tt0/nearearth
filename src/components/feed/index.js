import {connect} from 'react-redux';

import Logger from 'js-logger'
import {NeoFeed} from './NeoFeed';
import { neoFeedLinks, neoFeedNearEarthObjects } from '../../selectors';

const mapStateToProps = state =>
{
	const links = neoFeedLinks(state);
	const neo = neoFeedNearEarthObjects(state);

	return {neo,links};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onSelectId: id => Logger.info(id)
	}
}

const NeoFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NeoFeed);

export default NeoFeedContainer;