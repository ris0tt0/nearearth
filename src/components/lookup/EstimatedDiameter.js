import React from 'react'
import PropTypes from 'prop-types'

function EstimatedDiameter({feet,kilometers,meters,miles}) {
	return (
		<div className='EstimatedDiameter'>
			<table>
			<caption><b>Estimated Diameter</b></caption>
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">min</th>
					<th scope="col">max</th>
				</tr>
			</thead>
			<tbody>
				<tr key='feet'>
					<th scope="col">feet</th>
					<td>{feet.estimated_diameter_min}</td>
					<td>{feet.estimated_diameter_max}</td>
				</tr>
				<tr key='kilo'>
					<th scope="col">kilometers</th>
					<td>{kilometers.estimated_diameter_min}</td>
					<td>{kilometers.estimated_diameter_max}</td>
				</tr>
				<tr key='meters'>
					<th scope="col">meters</th>
					<td>{meters.estimated_diameter_min}</td>
					<td>{meters.estimated_diameter_max}</td>
				</tr>
				<tr key='miles'>
					<th scope="col">miles</th>
					<td>{miles.estimated_diameter_min}</td>
					<td>{miles.estimated_diameter_max}</td>
				</tr>
			</tbody>
			</table>
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

