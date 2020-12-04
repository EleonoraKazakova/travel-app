const createTrip = async (data) => {
  const res = await fetch('/trip', {
    method: 'POST',
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

function action() {
  const city = document.getElementById('city').value
  const date = document.getElementById('date').value

  createTrip({ city, date }).then(renderCity)
}
/**got data from backend*/
const getSavedCityData = async () => {
  const res = await fetch('/trip')
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
  document.getElementById('newDate').innerHTML = city.date
  document.getElementById('photo').src = city.photo
  
  console.log('city= ', city)
  renderWeather(city.weather)
}

const renderWeather = (weather) => {
  document.getElementById('weather').innerHTML = ''

  for (let i = 0; i < weather.length; i++) {
    const box = document.createElement("div")    
    
    box.innerHTML = "Date: " + weather[i].day + '<br>'+ "Temperature: " + weather[i].temp
    
    document.getElementById('weather').appendChild(box)
  }
}

getSavedCityData().then(renderCity)

export { action }