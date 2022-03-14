import { connect } from 'react-redux';
import { neoLookupOrbitalData } from '../../selectors';
import { OrbitialData } from './OrbitialData';

const mapStateToProps = (state) => {
  const orbitialData = { ...neoLookupOrbitalData(state) };

  return { orbitialData };
};

const OrbitalDataContainer = connect(mapStateToProps)(OrbitialData);

export default OrbitalDataContainer;
