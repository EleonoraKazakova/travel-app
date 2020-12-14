const axios = require('axios')
const baseURL = 'https://restcountries.eu/rest/v2/name/'

const getCountryData = async (country) => {
  try {
    return await axios.get(baseURL + country)
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = { getCountryData }