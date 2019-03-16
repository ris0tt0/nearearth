import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'js-logger';

function CloseApproachData({data}) {
	const datas = data.map((item,index) =>
	{
		return (<div key={index}>
			<span>close approach date: {item.close_approach_date}</span>
			<span>epoch date close approach: {item.epoch_date_close_approach}</span>
			<span>orbiting body: {item.orbiting_body}</span>
			<br />
			<span>relative velocity:</span><br />
			<span>kilometers per hour:{item.relative_velocity.kilometers_per_hour}</span>
			<span>kilometers per second:{item.relative_velocity.kilometers_per_second}</span>
			<span>miles per hour:{item.relative_velocity.miles_per_hour}</span>
			<br/>
			<span>miss distance</span>< br/>
			<span>astronomical: {item.miss_distance.astronomical}</span>
			<span>lunar{item.miss_distance.lunar}</span>
			<span>kilometers{item.miss_distance.kilometers}</span>
			<span>miles:{item.miss_distance.miles}</span>
		</div>)
	});

	return (
		<div className='CloseApproachData'>
			{datas}		
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



