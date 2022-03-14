import Logger from 'js-logger';
import { connect } from 'react-redux';
import { neoLookupIsFetching, neoLookupLinks } from '../../selectors';
import { NeoLookup } from './NeoLookup';

const mapStateToProps = (state) => {
  const links = neoLookupLinks(state);
  const isFetching = neoLookupIsFetching(state);

  return { isFetching, links };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectId: (id) => Logger.info(id),
  };
};

const NeoLookupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NeoLookup);

export default NeoLookupContainer;
