import React from 'react';
import PropTypes from 'prop-types';
import CloseApproachData from './CloseApproachDataContainer';
import EstimatedDiameter from './EstimatedDiameterContainer';
import OrbitialData from './OrbitialDataContainer';

function NeoLookup({isFetching,links,response}) {
	if(!response.id) return <div></div>;
	if(isFetching) return <div>loading lookup</div>;

	return (
		<div className='NeoLookup'>
			<h1>NeoLookup</h1>
			<span className='NeoLookup__title'>absolute magnitude h:</span><span className='NeoLookup__data'>{response.absolute_magnitude_h}</span>
			<br />
			<span className='NeoLookup__title'>designation:</span><span className='NeoLookup__data'>{response.designation}</span>
			<br />
			<span className='NeoLookup__title'>id:</span><span className='NeoLookup__data'>{response.id}</span>
			<br />
			<span className='NeoLookup__title'>is potentially hazardous asteroid:</span><span className='NeoLookup__data'>{response.is_potentially_hazardous_asteroid ? 'true' : 'false'}</span>
			<br />
			<span className='NeoLookup__title'>is sentry object:</span><span className='NeoLookup__data'>{response.is_sentry_object ? 'true' : 'false'}</span>
			<br />
			<span className='NeoLookup__title'>name:</span><span className='NeoLookup__data'>{response.name}</span>
			<br />
			<span className='NeoLookup__title'>nasa jpl url:</span><span className='NeoLookup__data'>{response.nasa_jpl_url}</span>
			<br />
			<span className='NeoLookup__title'>neo reference id:</span><span className='NeoLookup__data'>{response.neo_reference_id}</span>
			<br />
			<OrbitialData />
			<CloseApproachData />
			<EstimatedDiameter />
		</div>
	)
}

NeoLookup.propTypes = {
	isFetching:PropTypes.bool.isRequired,
	response:PropTypes.shape({
		absolute_magnitude_h:PropTypes.number.isRequired,
		designation:PropTypes.string.isRequired,
		id:PropTypes.string.isRequired,
		is_potentially_hazardous_asteroid:PropTypes.bool.isRequired,
		is_sentry_object:PropTypes.bool.isRequired,
		name:PropTypes.string.isRequired,
		nasa_jpl_url:PropTypes.string.isRequired,
		neo_reference_id:PropTypes.string.isRequired,}).isRequired,
}	

export {NeoLookup}

