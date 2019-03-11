import {connect} from 'react-redux';
import Logger from 'js-logger'
import {NeoLookup} from './NeoLookup'
import { neoLookupLinks, neoLookupCloseApproachDataList, neoLookupEstimatedDiameter, neoLookupOrbitalData, neoLookupResponse } from '../../selectors';

const mapStateToProps = state =>
{
	const response = neoLookupResponse(state);
	const links = neoLookupLinks(state);
	const close_approach_data = neoLookupCloseApproachDataList(state);
	const estimate_diameter = neoLookupEstimatedDiameter(state);
	const orbital_data = neoLookupOrbitalData(state);

	// Logger.info(`response`)
	// Logger.info(response);
	// Logger.info(`links`)
	// Logger.info(links)
	// Logger.info(`close_approach_data`)
	// Logger.info(close_approach_data)
	// Logger.info(`estimate_diameter`)
	// Logger.info(estimate_diameter)
	// Logger.info(`orbital_data`)
	// Logger.info(orbital_data)
	
	return {response,close_approach_data,links,estimate_diameter,orbital_data};
}

const mapDispatchToProps = dispatch =>
{
	return {
		onSelectId: id => Logger.info(id)
	}
}

const NeoLookupContainer = connect(mapStateToProps,mapDispatchToProps)(NeoLookup);

export default NeoLookupContainer;