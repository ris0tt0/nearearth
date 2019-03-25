import React from 'react'
import PropTypes from 'prop-types'

function ResponseData({response}) {
	return (
		<div className='ResponseData'>
			<h1>Object Data</h1>
			<span className='ResponseData__item'><b className='ResponseData__title'>name: </b><span className='ResponseData__data'>{response.name}</span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>absolute magnitude h: </b><span className='ResponseData__data'>{response.absolute_magnitude_h}</span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>designation:</b><span className='ResponseData__data'>{response.designation}</span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>id: </b><span className='ResponseData__data'>{response.id}</span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>is potentially hazardous asteroid:  </b><span className='ResponseData__data'>{response.is_potentially_hazardous_asteroid ? 'true' : 'false'}</span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>is sentry object: </b><span className='ResponseData__data'>{response.is_sentry_object ? 'true' : 'false'}</span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>NASA JPL url: </b><span className='ResponseData__data'><a href={response.nasa_jpl_url} target='_blank' rel='noopener noreferrer'>{response.nasa_jpl_url}</a></span></span>
			<br />
			<span className='ResponseData__item'><b className='ResponseData__title'>neo reference id: </b><span className='ResponseData__data'>{response.neo_reference_id}</span></span>
			<br />
		</div>
	)
}

ResponseData.propTypes = {
	response:PropTypes.shape({
		absolute_magnitude_h:PropTypes.number.isRequired,
		designation:PropTypes.string.isRequired,
		id:PropTypes.string.isRequired,
		is_potentially_hazardous_asteroid:PropTypes.bool.isRequired,
		is_sentry_object:PropTypes.bool.isRequired,
		name:PropTypes.string.isRequired,
		nasa_jpl_url:PropTypes.string.isRequired,
		neo_reference_id:PropTypes.string.isRequired,}).isRequired,
}

export {ResponseData}

