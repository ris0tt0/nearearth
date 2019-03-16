import {connect} from 'react-redux';
import Logger from 'js-logger';
import { OrbitialData } from './OrbitialData';
import { neoLookupOrbitalData } from '../../selectors';

const mapStateToProps = state =>
{
	const orbitialData = {...neoLookupOrbitalData(state)};

	return {orbitialData}
};

const OrbitalDataContainer = connect(mapStateToProps)(OrbitialData);

export default OrbitalDataContainer;