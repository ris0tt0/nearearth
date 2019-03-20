
/**
 * Returns the api key
 */
const api_key = process.env.REACT_APP_NASA_API ? process.env.REACT_APP_NASA_API : 'DEMO_KEY';
export function getNasaApiKey()
{
	return api_key;
}

/**
 * Formats date for Nasa API.
 * @param {Date} date 
 */
export function formatDateForNasaApi(date)
{
	date = date ? date : new Date();
	let day = date.getDate().toString();
	day = day.length>1?day:'0'+day;
	let month = (date.getMonth()+1).toString();
	month = month.length>1?month:'0'+month;
	const nasaDate = `${date.getFullYear()}-${month}-${day}`;

	return nasaDate;
}