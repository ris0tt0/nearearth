import { normalize, schema } from 'normalizr';
import {getNasaApiKey, formatDateForNasaApi} from '../utils';
import Logger from 'js-logger'
import { 
	REQUEST_NEO_FEED,
	REQUEST_ERROR_NEO_FEED,
	RECIEVE_NEO_FEED,
	DATE_NEO_FEED,
	REQUEST_NEO_LOOKUP,
	REQUEST_ERROR_NEO_LOOKUP,
	RECIEVE_NEO_LOOKUP,
	REQUEST_NEO_BROWSE,
	REQUEST_ERROR_NEO_BROWSE,
	RECIEVE_NEO_BROWSE,
 } from './ActionTypes';

/**
 * Neo - Feed 
 * Retrieve a list of Asteroids based on their closest approach date to Earth.
 * GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
 */
export function requestNEOFeed(isFetching){
	return {
		type:REQUEST_NEO_FEED,
		payload:isFetching,
	};
}

export function recieveNEOFeed(data){
	return{
		type:RECIEVE_NEO_FEED,
		payload:data,
	}
}

export function requestErrorNEOFeed(error)
{
	return {
		type:REQUEST_ERROR_NEO_FEED,
		payload:error,
	}
}

export function dateNeoFeed(date)
{
	return{
		type:DATE_NEO_FEED,
		payload:date,
	}
}

export function fetchLinkNeoFeed(linkApiUrl)
{
	return fetchNEOFeed(null,null,linkApiUrl);
}

export function fetchNEOFeed(startDate,endDate,linkApiUrl)
{
	return (dispatch,getState) =>
	{
		dispatch(requestNEOFeed(true));

		const apiKey = getNasaApiKey();
		const formattedStart = formatDateForNasaApi(startDate);
		const formattedEnd = formatDateForNasaApi( endDate ? endDate : startDate);

		const url = linkApiUrl ? linkApiUrl : `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStart}&end_date=${formattedEnd}&api_key=${apiKey}`;

		return fetch(url)
		.then( response => response.json(), error => dispatch(requestErrorNEOFeed(error)) )
		.then( json => {

			// if(json)
			Logger.info(json);

			const links = new schema.Entity('links',{},{idAttribute:obj => `${obj.self}id`});
			const miss_distance = new schema.Entity('miss_distance',{},{idAttribute:obj => `${obj.astronomical}+${obj.kilometers}+${obj.lunar}+${obj.miles}id`});
			const relative_velocity = new schema.Entity('relative_velocity',{},{idAttribute:obj => `${obj.kilometers_per_hour}+${obj.kilometers_per_second}+${obj.miles_per_hour}id`});
			const close_approach_data = new schema.Entity('close_approach_data',{miss_distance,relative_velocity},{idAttribute:obj => `${obj.epoch_date_close_approach}+${obj.close_approach_date}id`});
			const feet = new schema.Entity('feet',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const kilometers = new schema.Entity('kilometers',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const meters = new schema.Entity('meters',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const miles = new schema.Entity('miles',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const estimated_diameter = new schema.Entity('estimated_diameter',{feet,kilometers,meters,miles},{idAttribute:obj=>`${obj.feet.estimated_diameter_max}+${obj.meters.estimated_diameter_max}+${obj.miles.estimated_diameter_max}id`});
			const near_earth_objects = new schema.Entity('near_earth_objects',{estimated_diameter,links,close_approach_data:[close_approach_data]},{idAttribute:obj => `${obj.id}id`});
			const near_earth_objectsvalues = new schema.Values([near_earth_objects]);
			const mySchema = new schema.Entity('response',{links,near_earth_objects:near_earth_objectsvalues},{idAttribute:obj => `${obj}Id`});
			const data = normalize(json,mySchema);

			// Logger.info(data);

			dispatch(recieveNEOFeed(data));
			dispatch(requestNEOFeed(false));
		});
	}
}

 /**
	* Neo - Lookup
	*	Lookup a specific Asteroid based on its NASA JPL small body (SPK-ID) ID 
	*	GET https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY
  */
 export function requestNEOLookup(isFetching){
	return {
		type:REQUEST_NEO_LOOKUP,
		payload:isFetching,
	};
}

export function requestErrorNEOLookup(error){
	return{
		type:REQUEST_ERROR_NEO_LOOKUP,
		payload:error,
	}
}

export function recieveNEOLookup(data){
	// Logger.info('recieveNEOLookup');
	// Logger.info(data);
	return{
		type:RECIEVE_NEO_LOOKUP,
		payload:data,
	}
}

/**
	{
		{"links":{"self":"https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY"},
		"id":"3542519",
		"neo_reference_id":"3542519",
		"name":"(2010 PK9)",
		"designation":"2010 PK9",
		"nasa_jpl_url":"http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
		"absolute_magnitude_h":21.8,
		"estimated_diameter":{
			"kilometers":{
				"estimated_diameter_min":0.1160259082,
				"estimated_diameter_max":0.2594418179
			},
			"meters":{
				"estimated_diameter_min":116.0259082094,
				"estimated_diameter_max":259.4418179074
			},
			"miles":{
				"estimated_diameter_min":0.0720951346,
				"estimated_diameter_max":0.1612096218
			},
			"feet":{
				"estimated_diameter_min":380.6624406898,
				"estimated_diameter_max":851.1870938635
			}
		},
		"is_potentially_hazardous_asteroid":true,
		"close_approach_data":
			[
				{
					"close_approach_date":"1900-06-01",
					"epoch_date_close_approach":-2195913600000,
					"relative_velocity":{
						"kilometers_per_second":"30.9416868629",
						"kilometers_per_hour":"111390.072706571",
						"miles_per_hour":"69213.4593437024"
					},
					"miss_distance":{
						"astronomical":"0.0445187883",
						"lunar":"17.3178081512",
						"kilometers":"6659916",
						"miles":"4138279.75"
					},
					"orbiting_body":"Merc"
				}
			 ],
			 "orbital_data":{
				 "orbit_id":"18",
				 "orbit_determination_date":"2017-04-06 08:57:01",
				 "first_observation_date":"2010-08-05",
				 "last_observation_date":"2014-09-01",
				 "data_arc_in_days":1488,
				 "observations_used":76,
				 "orbit_uncertainty":"1",
				 "minimum_orbit_intersection":".0158728",
				 "jupiter_tisserand_invariant":"8.148",
				 "epoch_osculation":"2458600.5",
				 "eccentricity":".6757453486176279",
				 "semi_major_axis":".6822659452995298",
				 "inclination":"12.56193975201844",
				 "ascending_node_longitude":"306.5528064453793",
				 "orbital_period":"205.839618583536",
				 "perihelion_distance":".2212279062431636",
				 "perihelion_argument":"195.6340954830682",
				 "aphelion_distance":"1.143303984355896",
				 "perihelion_time":"2458626.124378946765",
				 "mean_anomaly":"315.1846409145398",
				 "mean_motion":"1.748934449438368",
				 "equinox":"J2000",
				 "orbit_class":{
					 "orbit_class_type":"ATE",
					 "orbit_class_description":"Near-Earth asteroid orbits similar to that of 2062 Aten",
					 "orbit_class_range":"a (semi-major axis) < 1.0 AU; q (perihelion) > 0.983 AU"}},
					 "is_sentry_object":false
					}
				}
 */

export function fetchNEOLookup(spkId)
{
	return (dispatch,getState) =>
	{
		dispatch(requestNEOLookup(true));
		const apiKey = getNasaApiKey();

		return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${spkId}?api_key=${apiKey}`)
		.then( response => response.json(), error => dispatch(requestErrorNEOLookup(error)) )
		.then( json => {
			
			const miss_distance = new schema.Entity('miss_distance',{},{idAttribute:obj => `${obj.lunar}+${obj.miles}id`});
			const relative_velocity = new schema.Entity('relative_velocity',{},{idAttribute:obj => `${obj.kilometers_per_hour}+${obj.kilometers_per_second}+${obj.miles_per_hour}id`});
			const close_approach_data = new schema.Entity('close_approach_data',{miss_distance,relative_velocity},{idAttribute:obj => `${obj.epoch_date_close_approach}+${obj.close_approach_date}id`});

			const orbit_class = new schema.Entity('orbit_class',{},{idAttribute:obj=>`${obj.orbit_class_range}id`});
			const orbital_data = new schema.Entity('orbital_data',{orbit_class},{idAttribute:obj => `${obj.aphelion_distance}+${obj.perihelion_distance}id`});
			const links = new schema.Entity('links',{},{idAttribute:obj => `${obj.self}id`});
			
			const feet = new schema.Entity('feet',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const kilometers = new schema.Entity('kilometers',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const meters = new schema.Entity('meters',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const miles = new schema.Entity('miles',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const estimated_diameter = new schema.Entity('estimated_diameter',{feet,kilometers,meters,miles},{idAttribute:obj=>`${obj}id`});
			
			const mySchema = new schema.Entity('response',{close_approach_data:[close_approach_data],orbital_data,links,estimated_diameter});
			const data = normalize(json,mySchema);

			dispatch(recieveNEOLookup(data));
			dispatch(requestNEOLookup(false));
		});
	}
}

/**
 * Neo - Browse 
 * Browse the overall Asteroid data-set 
 * GET https://api.nasa.gov/neo/rest/v1/neo/browse/
 */
export function requestNEOBrowse(isFetching){
	return {
		type:REQUEST_NEO_BROWSE,
		payload:isFetching,
	};
}

export function requestErrorNEOBrowse(error){
	return {
		type:REQUEST_ERROR_NEO_BROWSE,
		payload:error,
	}
}

export function recieveNEOBrowse(data){
	return{
		type:RECIEVE_NEO_BROWSE,
		payload:data,
	}
}

export function fetchLinkNEOBrowse(apiLink)
{
	return fetchNEOBrowse(apiLink);
}

export function fetchNEOBrowse(apiLink)
{
	return (dispatch,getState) =>
	{
		dispatch(requestNEOBrowse(true));

		const apiKey = getNasaApiKey();
		const url = apiLink ? apiLink : `https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=${apiKey}`;

		return fetch(url)
		.then( response => response.json(), error => dispatch(requestErrorNEOBrowse(error)) )
		.then( json => {
			// Logger.info(json);

			const links = new schema.Entity('links',{},{idAttribute:obj => `${obj.self}id`});
			const page = new schema.Entity('page',{},{idAttribute:obj => `${obj.number}+${obj.size}+${obj.total_elements}+${obj.total_pages}id`});

			const miss_distance = new schema.Entity('miss_distance',{},{idAttribute:obj => `${obj.astronomical}+${obj.kilometers}+${obj.lunar}+${obj.miles}id`});
			const relative_velocity = new schema.Entity('relative_velocity',{},{idAttribute:obj => `${obj.kilometers_per_hour}+${obj.kilometers_per_second}+${obj.miles_per_hour}id`});
			const close_approach_data = new schema.Entity('close_approach_data',{miss_distance,relative_velocity},{idAttribute:obj => `${obj.epoch_date_close_approach}+${obj.close_approach_date}id`});
			
			const feet = new schema.Entity('feet',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const kilometers = new schema.Entity('kilometers',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const meters = new schema.Entity('meters',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});
			const miles = new schema.Entity('miles',{},{idAttribute:obj => `${obj.estimated_diameter_max}+${obj.estimated_diameter_min}id`});

			const estimated_diameter = new schema.Entity('estimated_diameter',{feet,kilometers,meters,miles},{idAttribute:obj => `${obj.feet.estimated_diameter_max}id`});

			const orbit_class = new schema.Entity('orbit_class',{},{idAttribute:obj => `${obj.orbit_class_description}+${obj.orbit_class_range}+${obj.orbit_class_type}id`})
			const orbital_data = new schema.Entity('orbital_data',{orbit_class},{idAttribute:obj => `${obj.mean_anomaly}+${obj.mean_motion}id`});
			const near_earth_objects = new schema.Entity('near_earth_objects',{links,orbital_data,estimated_diameter,close_approach_data:[close_approach_data]},{idAttribute:obj => `${obj.designation}id`});
			const mySchema = new schema.Entity('response',{near_earth_objects:[near_earth_objects],links,page},{idAttribute:obj => `${obj}id`});
			const data = normalize(json,mySchema);

			// Logger.info(data);

			dispatch(recieveNEOBrowse(data));
			dispatch(requestNEOBrowse(false));
		});
	}
}
