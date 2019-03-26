import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function createneotable(neos,onSelectId)
{
	const neotablerows = neos.map((item,index) => (
		<tr key={index}>
			<td>{item.absolute_magnitude_h}</td>
			<td>{item.is_potentially_hazardous_asteroid ? <b>true</b> : 'false'}</td>
			<td>{item.is_sentry_object ? <b>true</b> : 'false'}</td>
			<td>{item.name}</td>
			<td><a href={item.nasa_jpl_url} target='_blank' rel='noopener noreferrer'>{item.nasa_jpl_url}</a></td>
			<td><button onClick={() => onSelectId(item.neo_reference_id)}>{item.neo_reference_id}</button></td>
		</tr>
	));

	const neotable = (
		<table>
			<caption><b>NEAR EARCH OBJECTS</b></caption>
			<thead>
			<tr>
				<th>Absolute magnitude h</th>
				<th>is potentially hazardous asteroid</th>
				<th>Is sentry object</th>
				<th>Name</th>
				<th>Nasa jpl url</th>
				<th>NEO reference id</th>
			</tr>
			</thead>
			<tbody>
				{neotablerows}
			</tbody>
		</table>
	);

	return neotable;
}


function neotable(title,neos,onSelectId)
{
	const neotable = createneotable(neos,onSelectId);

	return (
	<div><h1>{title}</h1>{neotable}</div>
	);
}


function NeoFeed({links,neo,isFetching,onSelectId,date,onDateChange,onLinkApi}) {

	if( isFetching ) return <div>loading</div>;

	const neotables = Object.entries(neo).map( entry => neotable(entry[0],entry[1],onSelectId));
	const l = <div><button onClick={() => onLinkApi(links.prev)}>PREV</button><button onClick={() => onLinkApi(links.next)}>NEXT</button></div>
	return (
		<div className='NeoFeed'>
			<h1>Near Earth Object Feed</h1>
			<DatePicker 
				onChange={onDateChange}
				selected={date}
			/>
			{l}
			<div>{neotables}</div>
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

