import {connect} from 'react-redux';
import Logger from 'js-logger';
import { neoLookupEstimatedDiameter } from '../../selectors';
import { EstimatedDiameter } from './EstimatedDiameter';

const mapStateToProps = state =>
{
	const estimateDiameter = neoLookupEstimatedDiameter(state);

	return {...estimateDiameter};

};

const CloseApproachDataContaier = connect(mapStateToProps)(EstimatedDiameter);

export default CloseApproachDataContaier;