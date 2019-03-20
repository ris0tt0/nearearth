import React from 'react'
import PropTypes from 'prop-types'

function NeoBrowse({neos,links,page,onSelectId,isFetching,onLinkApi}) {

	if(!links.self) return <div></div>;
	if( isFetching) return <div>Loading browse</div>
	
	const linkselement = <div className='NeoBrowse__links'>{links.prev ? <button onClick={() => onLinkApi(links.prev)}>PREV</button> : '' } {links.next ? <button onClick={() => onLinkApi(links.next)}>NEXT</button> : ''}</div>

	const detailselement = (
			<div className='NeoBrowse__details'>
				<span>number: {page.number}</span>
				<br />
				<span>size: {page.size}</span>
				<br />
				<span>total elements: {page.total_elements}</span>
				<br />
				<span>total pages: {page.total_pages}</span>
				<br />
			</div>)
	
	const neotablerows = neos.map((item,index) => (
		<tr key={index}>
			<td>{item.absolute_magnitude_h}</td>
			<td>{item.designation}</td>
			<td>{item.is_potentially_hazardous_asteroid ? <b>true</b> : 'false'}</td>
			<td>{item.is_sentry_object ? <b>true</b> : 'false'}</td>
			<td>{item.name}</td>
			<td><a href={item.nasa_jpl_url}>{item.nasa_jpl_url}</a></td>
			<td><button onClick={() => onSelectId(item.neo_reference_id)}>{item.neo_reference_id}</button></td>
		</tr>
	));

	const neotable = (
		<table>
			<tr>
				<th>Absolute magnitude h</th>
				<th>Designation</th>
				<th>is potentially hazardous asteroid</th>
				<th>Is sentry object</th>
				<th>Name</th>
				<th>Nasa jpl url</th>
				<th>NEO reference id</th>
			</tr>
			{neotablerows}
		</table>);

	return (
		<div className='NeoBrowse'>
			{linkselement}
			{detailselement}
			{neotable}
		</div>
	);
}

NeoBrowse.propTypes = {
	onSelectId:PropTypes.func.isRequired,
	isFetching:PropTypes.bool.isRequired,
	neos:PropTypes.arrayOf(PropTypes.shape({
		absolute_magnitude_h:PropTypes.number.isRequired,
		designation:PropTypes.string.isRequired,
		is_potentially_hazardous_asteroid:PropTypes.bool.isRequired,
		is_sentry_object:PropTypes.bool.isRequired,
		name:PropTypes.string.isRequired,
		nasa_jpl_url:PropTypes.string.isRequired,
		neo_reference_id:PropTypes.string.isRequired,
	})).isRequired,
	page:PropTypes.shape({
		number:PropTypes.number.isRequired,
		size:PropTypes.number.isRequired,
		total_elements:PropTypes.number.isRequired,
		total_pages:PropTypes.number.isRequired,
	}).isRequired,
	links:PropTypes.shape({
		self:PropTypes.string.isRequired,
		next:PropTypes.string,
		prev:PropTypes.string,
	}).isRequired,
}

export {NeoBrowse}

