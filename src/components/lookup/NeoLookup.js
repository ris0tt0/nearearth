import React from 'react';
import {bool,shape,string} from 'prop-types';
import CloseApproachData from './CloseApproachDataContainer';
import EstimatedDiameter from './EstimatedDiameterContainer';
import OrbitialData from './OrbitialDataContainer';
import ResponseData from './ResponseDataContainer';
import Logger from 'js-logger';

function NeoLookup({isFetching,links}) {
	if(!links.self) return <div></div>
	if(isFetching) return <div>Loading</div>;

	return (
		<div className='NeoLookup'>
			<h1>Near Earth Object Lookup</h1>
			<div className='NeoLookup__Content'>
				<div className='NeoLookup__Panel'>
					<ResponseData />
					<EstimatedDiameter />
				</div>
				<OrbitialData />
				<CloseApproachData />
			</div>
		</div>
	)
}

NeoLookup.propTypes = {
	isFetching:bool.isRequired,
	links:shape({
		self:string.isRequired,
		next:string,
		prev:string,
	}).isRequired,
}	

export {NeoLookup}

