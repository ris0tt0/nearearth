import {getNasaApiKey} from '../utils';
import Logger from 'js-logger'
import { 
	REQUEST_NEO_FEED,
	RECIEVE_NEO_FEED,
	REQUEST_NEO_LOOKUP,
	RECIEVE_NEO_LOOKUP,
	REQUEST_NEO_BROWSE,
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

export function recieveNEOFeed(json){
	return{
		type:RECIEVE_NEO_FEED,
		payload:json,
	}
}

export function fetchNEOFeed(startDate,endDate)
{
	return (dispatch,getState) =>
	{
		dispatch(requestNEOFeed(true));
		const apiKey = getNasaApiKey();

		return fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
		.then( response => response.json(), error => Logger.error(error) )
		.then( json => {

			dispatch(recieveNEOFeed(json));
			dispatch(requestNEOFeed(true));
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
export function recieveNEOLookup(json){
	return{
		type:RECIEVE_NEO_LOOKUP,
		payload:json,
	}
}

/**
 * 
 * {
 * 	{"links":{"self":"https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY"},
 * 	"id":"3542519",
 * 	"neo_reference_id":"3542519",
 * 	"name":"(2010 PK9)",
 * 	"designation":"2010 PK9",
 * 	"nasa_jpl_url":"http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519",
 * 	"absolute_magnitude_h":21.8,
 * 	"estimated_diameter":{
 * 		"kilometers":{
 * 			"estimated_diameter_min":0.1160259082,
 * 			"estimated_diameter_max":0.2594418179
 * 		},
 * 		"meters":{
 * 			"estimated_diameter_min":116.0259082094,
 * 			"estimated_diameter_max":259.4418179074
 * 		},
 * 		"miles":{
 * 			"estimated_diameter_min":0.0720951346,
 * 			"estimated_diameter_max":0.1612096218
 * 		},
 * 		"feet":{
 * 			"estimated_diameter_min":380.6624406898,
 * 			"estimated_diameter_max":851.1870938635
 * 		}
 * 	},
 * 	"is_potentially_hazardous_asteroid":true,
 * 	"close_approach_data":
 * 		[
 * 			{
 * 				"close_approach_date":"1900-06-01",
 * 				"epoch_date_close_approach":-2195913600000,
 * 				"relative_velocity":{
 * 					"kilometers_per_second":"30.9416868629",
 * 					"kilometers_per_hour":"111390.072706571",
 * 					"miles_per_hour":"69213.4593437024"
 * 				},
 * 				"miss_distance":{
 * 					"astronomical":"0.0445187883",
 * 					"lunar":"17.3178081512",
 * 					"kilometers":"6659916",
 * 					"miles":"4138279.75"
 * 				},
 * 				"orbiting_body":"Merc"
 * 			}
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
		.then( response => response.json(), error => Logger.error(error) )
		.then( json => {

			dispatch(recieveNEOLookup(json));
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
export function recieveNEOBrowse(json){
	return{
		type:RECIEVE_NEO_BROWSE,
		payload:json,
	}
}

export function fetchNEOBrowse()
{
	return (dispatch,getState) =>
	{
		dispatch(requestNEOBrowse(true));

		const apiKey = getNasaApiKey();

		return fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse/?api_key=${apiKey}`)
		.then( response => response.json(), error => Logger.error(error) )
		.then( json => {

			dispatch(recieveNEOBrowse(json));
			dispatch(requestNEOBrowse(false));
		});
	}
}
