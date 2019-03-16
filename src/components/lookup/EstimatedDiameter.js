import React from 'react'
import PropTypes from 'prop-types'

function EstimatedDiameter({feet,kilometers,meters,miles}) {
	return (
		<div className='EstimatedDiameter'>
			<br />
			<span>Feet:</span>
			<br />
			<span>min:{feet.estimated_diameter_min}</span>
			<span>max:{feet.estimated_diameter_max}</span>
			<br />
			<span>kilometers:</span>
			<br />
			<span>min:{kilometers.estimated_diameter_min}</span>
			<span>max:{kilometers.estimated_diameter_max}</span>
			<br />
			<span>meters:</span>
			<br />
			<span>min:{meters.estimated_diameter_min}</span>
			<span>max:{meters.estimated_diameter_max}</span>
			<br />
			<span>miles:</span>
			<br />
			<span>min:{miles.estimated_diameter_min}</span>
			<span>max:{miles.estimated_diameter_max}</span>
		</div>
	)
}

EstimatedDiameter.propTypes = {
		feet:PropTypes.shape({
			estimated_diameter_min:PropTypes.number.isRequired,
			estimated_diameter_max:PropTypes.number.isRequired,}).isRequired,
		kilometers:PropTypes.shape({
			estimated_diameter_min:PropTypes.number.isRequired,
			estimated_diameter_max:PropTypes.number.isRequired,}).isRequired,
		meters:PropTypes.shape({
			estimated_diameter_min:PropTypes.number.isRequired,
			estimated_diameter_max:PropTypes.number.isRequired,}).isRequired,
		miles:PropTypes.shape({
			estimated_diameter_min:PropTypes.number.isRequired,
			estimated_diameter_max:PropTypes.number.isRequired,}).isRequired,
}

export {EstimatedDiameter}

