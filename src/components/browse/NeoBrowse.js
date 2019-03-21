import React from 'react';
import {string,number,func,bool,arrayOf,shape} from 'prop-types';

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
	onSelectId:func.isRequired,
	isFetching:bool.isRequired,
	neos:arrayOf(shape({
		absolute_magnitude_h:number.isRequired,
		designation:string.isRequired,
		is_potentially_hazardous_asteroid:bool.isRequired,
		is_sentry_object:bool.isRequired,
		name:string.isRequired,
		nasa_jpl_url:string.isRequired,
		neo_reference_id:string.isRequired,
	})).isRequired,
	page:shape({
		number:number.isRequired,
		size:number.isRequired,
		total_elements:number.isRequired,
		total_pages:number.isRequired,
	}).isRequired,
	links:shape({
		self:string.isRequired,
		next:string,
		prev:string,
	}).isRequired,
}

export {NeoBrowse}

