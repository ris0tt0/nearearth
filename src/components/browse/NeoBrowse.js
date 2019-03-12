import React from 'react'
import PropTypes from 'prop-types'

function NeoBrowse({neos,links,page,onSelectId,isFetching}) {

	if(!links.self) return <div></div>;
	if( isFetching) return <div>Loading browse</div>
	
	const n = neos.map((item,index) => (
		<div key={index}>name:{item.name} designation:{item.designation} neo ref id:<button onClick={e=>{e.stopPropagation();onSelectId(item.neo_reference_id)}}>{item.neo_reference_id}</button>  HAZARD:{item.is_potentially_hazardous_asteroid ? 'true' : 'false'}</div>
		))
	const l = <div>self: {links.self}</div>
	const p = (
			<div>
				<span>number: {page.number}</span>
				<br />
				<span>size: {page.size}</span>
				<br />
				<span>total elements: {page.total_elements}</span>
				<br />
				<span>total pages: {page.total_pages}</span>
				<br />
			</div>)
	
	return (
		<div>
			<h2>NeoBrowse</h2>
			{l}
			{p}
			<div>List of Near Earch Objects:</div>
			{n}
		</div>
	)
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

