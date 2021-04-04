const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1386bca768660f3887d5931fe7edbc80&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=f'
    request({ url: url, json: true }, (error, { body }) => {
    if(error){
        callback("Unable to connect to weather forecast.", undefined)
    } else if (body.error) {
        callback("Unable to find location", undefined)
    } else {

        callback(undefined, {
            success: body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out."
        })

    }  
}) 
}

module.exports = forecast 