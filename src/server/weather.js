const axios = require('axios')
const apiKey = process.env.apiKey

const baseURL = 'http://api.weatherbit.io/v2.0/forecast/daily'

const getWeatherData = async ( city ) => {
  try {
    return await axios.get(baseURL + `?city=${city}&key=${apiKey}`)
  } catch (error) {
    console.log('weatherError', error)
  }
}

module.exports = { getWeatherData }