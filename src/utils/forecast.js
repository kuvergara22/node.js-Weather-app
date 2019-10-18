const request = require('request');

const forecastCode = (latitude, longitude, callback) => {
 const url = 'https://api.darksky.net/forecast/a5556cc9c78391fc5579dc6bf9a67b3d/'+ latitude +','+ longitude +'?units=si';
 request({url: url, json: true}, (error, response) => {

    if(error){
        callback('internet is not working', undefined)
    } else if(response.body.currently === 0){
        callback('the request was unavailable', undefined)
    } else {
        callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees outside. ' + 'There is ' + response.body.currently.precipProbability + ' % chance of rain')
    }
  })
}
module.exports = forecastCode