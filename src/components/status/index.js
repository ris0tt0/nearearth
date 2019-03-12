import {connect} from 'react-redux';

import Logger from 'js-logger';
import {Status} from './Status';
import { neoFeedLinks, neoFeedNearEarthObjects } from '../../selectors';

const mapStateToProps = state =>
{
	// const links = neoFeedLinks(state);
	// const neo = neoFeedNearEarthObjects(state);

	// Logger.info('index-NeoFeed');
	// Logger.info(links);
	// Logger.info(neo);

	return {};
}

const NeoFeedContainer = connect(mapStateToProps)(Status);

export default NeoFeedContainer;