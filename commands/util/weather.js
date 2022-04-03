module.exports = {
    name: 'weather',
    description: 'Shows the weather of a City',
    syntax: '<City>',
    args: true,
    run:async(message) => {
        let fetch = require('node-fetch')
        let city = message.args.join(' ')
        let link = `http://api.weatherapi.com/v1/current.json?key=83cb8dbaee974402bee82658221202&q=${city}&aqi=no`
        let req = await fetch(link).catch(console.log);
        if(!req) return await message.channel.send('Couldn\'t find the city.').catch(console.log);
        let res = await req.json().catch(console.log);
        if(!res) return await message.channel.send('Couldn\'t evaluate the city.').catch(console.log);
        let parse = {
            city: res.location.name,
            region: res.location.region,
            country: res.location.country,
            temp_c: res.current.temp_c,
            temp_f: res.current.temp_f,
            wind_mph: res.current.wind_mph,
            wind_kph: res.current.wind_kph,
            weather_condition: res.current.condition.text,
            last_updated: res.current.last_updated,
            realfeel_c: res.current.feelslike_c,
            realfeel_f: res.current.feelslike_f
        };
        return await message.channel.send({embeds: [{
            title: `Weather in ${parse.city}`,
            description: `Region: ${parse.region}\nCountry: ${parse.country}\nTemperature: ${parse.temp_c}°C / ${parse.temp_f}°F\nWind: ${parse.wind_kph} KPH / ${parse.wind_mph} MPH \nCurrent Condition: ${parse.weather_condition}\nRealFeel: ${parse.realfeel_c}°C / ${parse.realfeel_f}°F\nLast updated: ${parse.last_updated}`
        }]}).catch(console.log);
    }
}