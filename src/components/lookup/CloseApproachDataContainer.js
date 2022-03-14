import { connect } from 'react-redux';
import { neoLookupCloseApproachDataList } from '../../selectors';
import { CloseApproachData } from './CloseApproachData';

const mapStateToProps = (state) => {
  const data = neoLookupCloseApproachDataList(state);

  return { data };
};

const CloseApproachDataContaier = connect(mapStateToProps)(CloseApproachData);

export default CloseApproachDataContaier;
