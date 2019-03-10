import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger';

function headerone(title,items)
{
	const divs = items.map(item => <div>name: {item.name} id:{item.id}</div>);

	return(
		<div>
			<h1>{title}</h1>
			{divs}
		</div>
	);
}

function NeoFeed({links,neo}) {

	Logger.info(`NeoFeed`);
	Logger.info(links);
	Logger.info(neo);

	const h1 = Object.entries(neo).map( entry => headerone(entry[0],entry[1]));

	return (
		<div>
			{h1}
		</div>
	)
}

NeoFeed.propTypes = {

}

export {NeoFeed}

