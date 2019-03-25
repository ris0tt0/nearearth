import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'js-logger';

function CloseApproachData({data}) {
	const rows = data.map((item,index) =>
	{
		const d = new Date(item.epoch_date_close_approach);
		// Logger.info(d.toString());

		const longdate = new Intl.DateTimeFormat(
			'en-US',
			{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
				.format(d);

		return (
		<tr key={index}>
			{/* <td>{item.close_approach_date}</td> */}
			{/* <td>{item.epoch_date_close_approach}</td> */}
			<td>{longdate}</td>
			<td>{item.orbiting_body}</td>
			<td>{item.relative_velocity.kilometers_per_hour}</td>
			<td>{item.relative_velocity.kilometers_per_second}</td>
			<td>{item.relative_velocity.miles_per_hour}</td>
			<td>{item.miss_distance.astronomical}</td>
			<td>{item.miss_distance.lunar}</td>
			<td>{item.miss_distance.kilometers}</td>
			<td>{item.miss_distance.miles}</td>
		</tr>)
	});

	return (
	<div className='CloseApproachData'>
		<table>
			<caption><b>Close Approach Data</b></caption>
			<thead>
			<tr>
				<th scope="col">close approach date</th>
				<th scope="col">orbiting body</th>
				<th scope="col">kilometers per hour</th>
				<th scope="col">kilometers per second</th>
				<th scope="col">miles per hour</th>
				<th scope="col">astronomical</th>
				<th scope="col">lunar</th>
				<th scope="col">kilometers</th>
				<th scope="col">miles</th>
			</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	</div>
	)
}

CloseApproachData.propTypes = {
	data:PropTypes.arrayOf(PropTypes.shape({
		close_approach_date:PropTypes.string.isRequired,
		epoch_date_close_approach:PropTypes.number.isRequired,
		orbiting_body:PropTypes.string.isRequired,
		relative_velocity:PropTypes.shape({
			kilometers_per_second:PropTypes.string.isRequired,
			kilometers_per_hour:PropTypes.string.isRequired,
			miles_per_hour:PropTypes.string.isRequired,
		}).isRequired,
		miss_distance:PropTypes.shape({
			astronomical:PropTypes.string.isRequired,
			lunar:PropTypes.string.isRequired,
			kilometers:PropTypes.string.isRequired,
			miles:PropTypes.string.isRequired,
		}).isRequired,
	})).isRequired,
}

export {CloseApproachData}



