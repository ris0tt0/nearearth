import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function headerone(title,items,onSelectId)
{
	const divs = items.map((item,index) => 
	{
		return <div key={index}>name: {item.name} id:<button onClick={e =>
			{
				e.stopPropagation();
				onSelectId(item.id);
			}}>{item.id}</button></div>
	});

	return(
		<div key={title}>
			<h2>{title}</h2>
			{divs}
		</div>
	);
}

function NeoFeed({links,neo,isFetching,onSelectId,date,onDateChange,onLinkApi}) {

	// if(!links.self) return <div></div>;
	if( isFetching ) return <div>loading</div>;

	const h1 = Object.entries(neo).map( entry => headerone(entry[0],entry[1],onSelectId));
	const l = <div><button onClick={() => onLinkApi(links.prev)}>PREV</button><button onClick={() => onLinkApi(links.next)}>NEXT</button></div>
	return (
		<div>
			<h1>NeoFeed</h1>
			<DatePicker 
				onChange={onDateChange}
				selected={date}
			/>
			{l}
			{h1}
		</div>
	)
}

NeoFeed.propTypes = {
	onLinkApi:PropTypes.func.isRequired,
	onSelectId:PropTypes.func.isRequired,
	// object of arrays of Near Earth Object
	neo:PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
		absolute_magnitude_h:PropTypes.number.isRequired,
		id:PropTypes.string.isRequired,
		is_potentially_hazardous_asteroid:PropTypes.bool.isRequired,
		is_sentry_object:PropTypes.bool.isRequired,
		name:PropTypes.string.isRequired,
		nasa_jpl_url:PropTypes.string.isRequired,
		neo_reference_id:PropTypes.string.isRequired,
	}))).isRequired,
	links:PropTypes.shape({
		self:PropTypes.string.isRequired,
		next:PropTypes.string,
		prev:PropTypes.string,
	}).isRequired,
}

export {NeoFeed}

