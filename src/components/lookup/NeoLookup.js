import React from 'react';
import PropTypes from 'prop-types';
import CloseApproachData from './CloseApproachDataContainer';
import EstimatedDiameter from './EstimatedDiameterContainer';
import OrbitialData from './OrbitialDataContainer';
import ResponseData from './ResponseDataContainer';

function NeoLookup({isFetching,links}) {
	if(isFetching) return <div>loading lookup</div>;

	return (
		<div className='NeoLookup'>
			<h1>Near Earth Object Lookup</h1>
			<ResponseData />
			<EstimatedDiameter />
			<OrbitialData />
			<CloseApproachData />
		</div>
	)
}

NeoLookup.propTypes = {
	isFetching:PropTypes.bool.isRequired,
}	

export {NeoLookup}

