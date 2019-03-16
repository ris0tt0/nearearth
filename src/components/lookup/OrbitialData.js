import React from 'react'
import PropTypes from 'prop-types'

function OrbitialData({orbitialData}) {
	return (
		<div className='OrbitialData'>
			<span>aphelion_distance:{orbitialData.aphelion_distance}</span>
			<br />
			<span>ascending node longitude:{orbitialData.ascending_node_longitude}</span>
			<br />
			<span>data arc in day:{orbitialData.data_arc_in_days}</span>
			<br />
			<span>eccentricity:{orbitialData.eccentricity}</span>
			<br />
			<span>epoch osculation:{orbitialData.epoch_osculation}</span>
			<br />
			<span>equinox:{orbitialData.equinox}</span>
			<br/>
			<span>first observation date:{orbitialData.first_observation_date}</span>
			<br />
			<span>inclination:{orbitialData.inclination}</span>
			<br />
			<span>jupiter tisserand invariant:{orbitialData.jupiter_tisserand_invariant}</span>
			<br />
			<span>last observation date:{orbitialData.last_observation_date}</span>
			<br />
			<span>mean anomaly:{orbitialData.mean_anomaly}</span>
			<br />
			<span>mean motion:{orbitialData.mean_motion}</span>
			<br />
			<span>minimum orbit intersection:{orbitialData.minimum_orbit_intersection}</span>
			<br />
			<span>oservations used:{orbitialData.observations_used}</span>
			<br />
			<span>orbit class:{orbitialData.orbit_class}</span>
			<br />
			<span>orbit determination date:{orbitialData.orbit_determination_date}</span>
			<br />
			<span>orbit id:{orbitialData.orbit_id}</span>
			<br />
			<span>orbit uncertanity:{orbitialData.orbit_uncertainty}</span>
			<br/>
			<span>orbitial perioid:{orbitialData.orbital_period}</span>
			<br />
			<span>perihelion argument:{orbitialData.perihelion_argument}</span>
			<br />
			<span>perihelion distance:{orbitialData.perihelion_distance}</span>
			<br />
			<span>perhelion time:{orbitialData.perihelion_time}</span>
			<br />
			<span>semi major axis:{orbitialData.semi_major_axis}</span>
		</div>
	)
}

OrbitialData.propTypes = {
	orbitialData:PropTypes.shape({
		aphelion_distance:PropTypes.string.isRequired,
		ascending_node_longitude:PropTypes.string.isRequired,
		data_arc_in_days:PropTypes.number.isRequired,
		eccentricity:PropTypes.string.isRequired,
		epoch_osculation:PropTypes.string.isRequired,
		equinox:PropTypes.string.isRequired,
		first_observation_date:PropTypes.string.isRequired,
		inclination:PropTypes.string.isRequired,
		jupiter_tisserand_invariant:PropTypes.string.isRequired,
		last_observation_date:PropTypes.string.isRequired,
		mean_anomaly:PropTypes.string.isRequired,
		mean_motion:PropTypes.string.isRequired,
		minimum_orbit_intersection:PropTypes.string.isRequired,
		observations_used:PropTypes.number.isRequired,
		orbit_class:PropTypes.string.isRequired,
		orbit_determination_date:PropTypes.string.isRequired,
		orbit_id:PropTypes.string.isRequired,
		orbit_uncertainty:PropTypes.string.isRequired,
		orbital_period:PropTypes.string.isRequired,
		perihelion_argument:PropTypes.string.isRequired,
		perihelion_distance:PropTypes.string.isRequired,
		perihelion_time:PropTypes.string.isRequired,
		semi_major_axis:PropTypes.string.isRequired,
	}).isRequired,
}

export {OrbitialData}

