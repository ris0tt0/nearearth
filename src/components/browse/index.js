import { connect } from 'react-redux';
import { fetchLinkNEOBrowse, fetchNEOLookup } from '../../actions/';
import {
  neoBrowseIsFetching,
  neoBrowseLinks,
  neoBrowseNearEarthObjectsList,
  neoBrowsePage,
} from '../../selectors';
import { NeoBrowse } from './NeoBrowse';

const mapStateToProps = (state) => {
  const neos = neoBrowseNearEarthObjectsList(state);
  const links = neoBrowseLinks(state);
  const page = neoBrowsePage(state);
  const isFetching = neoBrowseIsFetching(state);

  return { neos, links, page, isFetching };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectId: (id) => dispatch(fetchNEOLookup(id)),
    onLinkApi: (url) => dispatch(fetchLinkNEOBrowse(url)),
  };
};

const NeoFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NeoBrowse);

export default NeoFeedContainer;
