const baseURL = 'http://api.geonames.org/searchJSON'

const getCityData = async (baseURL, cityName) => {
  const req = await fetch(baseURL + `?q=${cityName}&username=eleonorakazakova`)
  try {
    const data = await req.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

function action(){
  const newCity = document.getElementById('city').value
  console.log(newCity)
  getCityData(baseURL, newCity).then(
    function(data) {
      const allData = {
        city: newCity,
        country: data.geonames[0].countryCode,
        longitude: data.geonames[0].lng,
        latitude: data.geonames[0].lat
      }
      renderCity(allData)

      saveCityData('/', allData) 
    }
  )
}

const saveCityData = async (path, data = {}) => {
  const res = await fetch(path, {
    method: 'POST', //send data
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  try {
    const newData = await res.json()
    return newData
  } catch (error) {
    console.log('error', error)
  }
}

const getSavedCityData = async () => {
  const res = await fetch('/city')
  try {
    return await res.json()
  } catch (error) {
    console.log('error', error)
  }
}

const renderCity = (city) => {
  document.getElementById('newcity').innerHTML = city.city
  document.getElementById('newcountry').innerHTML = city.country
  document.getElementById('longitude').innerHTML = city.longitude
  document.getElementById('latitude').innerHTML = city.latitude
}

getSavedCityData().then(renderCity)

export {action}