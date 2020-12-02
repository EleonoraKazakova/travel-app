const axios = require('axios')

const baseURL = 'http://api.geonames.org/searchJSON'

const getCityData = async (cityName) => {
  try { 
    return await axios.get(baseURL + `?q=${cityName}&username=eleonorakazakova`)
  } catch (error) {
    console.log('error', error)
  }
}


module.exports = {getCityData}

