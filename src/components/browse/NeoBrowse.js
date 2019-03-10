import React from 'react'
import PropTypes from 'prop-types'

function NeoBrowse({neos}) {
	const n = neos.map((item,index) => <div key={index}>name:{item.name} designation:{item.designation}</div>)
	return (
		<div>
			NeoBrowse
			{n}
		</div>
	)
}

NeoBrowse.propTypes = {

}

export {NeoBrowse}

