
/**
 * Returns the api key
 */
const api_key = process.env.REACT_APP_NASA_API ? process.env.REACT_APP_NASA_API : 'DEMO_KEY';
export function getNasaApiKey()
{
	return api_key;
}