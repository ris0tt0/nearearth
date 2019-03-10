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

const NeoFeedContainer = connect(mapStateToProps)(NeoFeed);

export default NeoFeedContainer;