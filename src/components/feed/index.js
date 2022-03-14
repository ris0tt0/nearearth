import { connect } from 'react-redux';
import {
  dateNeoFeed,
  fetchLinkNeoFeed,
  fetchNEOFeed,
  fetchNEOLookup,
} from '../../actions/';
import {
  neoFeedDate,
  neoFeedIsFetching,
  neoFeedLinks,
  neoFeedNearEarthObjects,
} from '../../selectors';
import { NeoFeed } from './NeoFeed';

const mapStateToProps = (state) => {
  const links = neoFeedLinks(state);
  const neo = neoFeedNearEarthObjects(state);
  const isFetching = neoFeedIsFetching(state);
  const date = neoFeedDate(state);

  return { neo, links, isFetching, date };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLinkApi: (url) => dispatch(fetchLinkNeoFeed(url)),
    // api call to get more info in this specific astroid
    onSelectId: (id) => dispatch(fetchNEOLookup(id)),
    // load new feed data for the date.
    onDateChange: (date) => {
      dispatch(dateNeoFeed(date));
      dispatch(fetchNEOFeed(date));
    },
  };
};

const NeoFeedContainer = connect(mapStateToProps, mapDispatchToProps)(NeoFeed);

export default NeoFeedContainer;
