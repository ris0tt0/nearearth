import { connect } from 'react-redux';
import { neoLookupResponse } from '../../selectors';
import { ResponseData } from './ResponseData';

const mapStateToProps = (state) => {
  const response = neoLookupResponse(state);

  return { response };
};

const ResponseDataContainer = connect(mapStateToProps)(ResponseData);

export default ResponseDataContainer;
