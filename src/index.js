const moment = require('moment');
require('moment-timezone');

function convertDateToTimeZone(dateString, timeZone) {
	if (!timeZone) {
		return dateString;
	}

	if (!dateString) {
		return null;
	}

	return moment.tz(dateString, timeZone).format('DD MMM YYYY, HH:MM:SS A');
}

console.log(convertDateToTimeZone('2024-04-01T01:00:00Z', 'America/Los_Angeles'));
