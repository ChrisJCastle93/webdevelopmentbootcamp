var request = require('request');
// request('https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca&format=json', function(error, response, body){
//     if(!error && response.statusCode == 200){
//         console.log(body);
//     }
// });


request('https://api.sunrise-sunset.org/json?lat=69.672294&lng=24.948060&date=today', function (error, response, body) {
	if( !error && response.statusCode == 200) {
        var parsedData = JSON.parse(body); 
		console.log(parsedData["results"]["sunrise"]);	
	}
});