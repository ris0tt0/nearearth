import { createSelector } from 'reselect';
import Logger from 'js-logger';

function getNeoFeed(state){ return state.neoFeed; }
function getNeoBrowse(state){ return state.neoBrowse; }
function getNeoLookup(state){ return state.neoLookup; }

/**
 * The NEO FEED response object.
 */
export const neoFeedResponse = createSelector(getNeoFeed,feed =>
	{
		if(feed.result && feed.entities.response && feed.entities.response[feed.result])
		{
			return {...feed.entities.response[feed.result]};
		}

		return {};
	});

	/**
	 * The NEO FEED response links object.
	 */
export const neoFeedLinks = createSelector([getNeoFeed,neoFeedResponse],
	(feed,response) =>
	{
		if(feed.entities)
		{
			return {...feed.entities.links[response.links]};
		}

		return {}
	});

/**
 * Returns the Near Earth Objects in an object with keys that represent the days and
 * on each day a list of NEOs.
 */
export const neoFeedNearEarthObjects = createSelector([getNeoFeed,neoFeedResponse],
	(feed,response) =>
	{
		if(feed.entities)
		{
			const near_earth_objects = {...response.near_earth_objects};
			Object.entries(response.near_earth_objects).map(entry =>
				{
					near_earth_objects[entry[0]] = entry[1].map( id => feed.entities.near_earth_objects[id]);
				});

			return near_earth_objects;
		}

		return {};
	});


	/**
 * The NEO BROWSE response object.
 */
export const neoBrowseResponse = createSelector(getNeoBrowse,browse =>
	{
		if(browse.result && browse.entities.response && browse.entities.response[browse.result])
		{
			return {...browse.entities.response[browse.result]};
		}

		return {};
	});

	//near_earth_objects
/**
 * The NEO BROWSE RESPONSE object near earth objects  list.
 */
export const neoBrowseNearEarthObjectsList = createSelector([getNeoBrowse,neoBrowseResponse],
	(browse, response) =>
	{
		if( browse.result)
		{
			return response.near_earth_objects.map(id => browse.entities.near_earth_objects[id])
		}

		return [];
	});

/**
 * The NEO BROWSE RESPONSE object Links data.
 */
export const neoBrowseLinks = createSelector([getNeoBrowse,neoBrowseResponse],
	(browse,response) =>
	{
		if( browse.result)
		{
			return browse.entities.links[response.links];
		}

		return {};
	});

export const neoBrowsePage = createSelector([getNeoBrowse,neoBrowseResponse],
	(browse,response) =>
	{
		if( browse.result)
		{
			return browse.entities.page[response.page];
		}

		return {};
	});
	//page