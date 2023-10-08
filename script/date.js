function getDate(date, dateObject) {
	/* Parse date in DD/MM/YYYY format
	https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object */
	var dateParts = date.split("/");
	dateObject.setFullYear(+dateParts[2]);
	dateObject.setMonth(dateParts[1] - 1);
	dateObject.setDate(+dateParts[0]);
} 

function printDate(date) {
	var dateObject = new Date("01/01/1970");
	getDate(date, dateObject);
	const options = {year: 'numeric', month: 'short', day: 'numeric'};
	return dateObject.toLocaleDateString('en-uk', options);
} 

export {getDate, printDate};