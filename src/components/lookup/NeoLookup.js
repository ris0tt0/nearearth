import React from 'react'
import PropTypes from 'prop-types'

function NeoLookup({close_approach_data,links,estimate_diameter,orbital_data,response}) {
	if(!response.id) return <div></div>;

	return (
		<div>
			<div>NeoLookup</div>
			<span>absolute magnitude h:{response.absolute_magnitude_h}</span>
			<br />
			<span>designation:{response.designation}</span>
			<br />
			<span>id:{response.id}</span>
			<br />
			<span>is potentially hazardous asteroid:{response.is_potentially_hazardous_asteroid ? 'true' : 'false'}</span>
			<br />
			<span>is sentry object:{response.is_sentry_object ? 'true' : 'false'}</span>
			<br />
			<span>name:{response.name}</span>
			<br />
			<span>nasa jpl url:{response.nasa_jpl_url}</span>
			<br />
			<span>neo reference id:{response.neo_reference_id}</span>
			<br />
		</div>
	)
}

NeoLookup.propTypes = {
	response:PropTypes.shape({
		absolute_magnitude_h:PropTypes.number.isRequired,
		designation:PropTypes.string.isRequired,
		id:PropTypes.string.isRequired,
		is_potentially_hazardous_asteroid:PropTypes.bool.isRequired,
		is_sentry_object:PropTypes.bool.isRequired,
		name:PropTypes.string.isRequired,
		nasa_jpl_url:PropTypes.string.isRequired,
		neo_reference_id:PropTypes.string.isRequired,
	})
}

export {NeoLookup}

