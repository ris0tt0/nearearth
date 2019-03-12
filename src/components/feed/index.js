import {connect} from 'react-redux';

import Logger from 'js-logger'
import {NeoFeed} from './NeoFeed';
import { fetchNEOFeed, dateNeoFeed, fetchNEOLookup} from '../../actions/'
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
		onSelectId: id => dispatch(fetchNEOLookup(id)),
		onDateChange: date => 
		{
			dispatch(dateNeoFeed(date))
			dispatch(fetchNEOFeed(date));
		},
	}
}

const NeoFeedContainer = connect(mapStateToProps,mapDispatchToProps)(NeoFeed);

export default NeoFeedContainer;