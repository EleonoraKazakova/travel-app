const axios = require('axios')

const baseURL = 'http://api.geonames.org/searchJSON'
const userName = process.env.userName

const getCityData = async (cityName) => {
  try { 
    return await axios.get(baseURL + `?q=${cityName}&username=${userName}`)
  } catch (error) {
    console.log('error', error)
  }
}


module.exports = {getCityData}

