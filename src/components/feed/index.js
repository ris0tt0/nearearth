import {connect} from 'react-redux';

import Logger from 'js-logger'
import {NeoFeed} from './NeoFeed';
import { fetchNEOFeed, dateNeoFeed, fetchNEOLookup, fetchLinkNeoFeed} from '../../actions/'
import { neoFeedLinks, neoFeedNearEarthObjects, neoFeedIsFetching, neoFeedDate } from '../../selectors';

const mapStateToProps = state =>
{
	const links = neoFeedLinks(state);
	const neo = neoFeedNearEarthObjects(state);
	const isFetching = neoFeedIsFetching(state);
	const date = neoFeedDate(state);

	return {neo,links,isFetching,date};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onLinkApi: url => dispatch(fetchLinkNeoFeed(url)),
		// api call to get more info in this specific astroid
		onSelectId: id => dispatch(fetchNEOLookup(id)),
		// load new feed data for the date.
		onDateChange: date => 
		{
			dispatch(dateNeoFeed(date))
			dispatch(fetchNEOFeed(date));
		},
	}
}

const NeoFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NeoFeed);

export default NeoFeedContainer;