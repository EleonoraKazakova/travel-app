const axios = require('axios')
const baseURL = 'https://pixabay.com/api/'
const apiKey = process.env.apiKeyPhoto

const getPhotoData = async(city) => {
  try{
    return await axios.get(baseURL + `?key=${apiKey}&q=${city}+buildings&image_type=photo`)
  } catch (error){
    console.log('error', error)
  }
}

module.exports = { getPhotoData }