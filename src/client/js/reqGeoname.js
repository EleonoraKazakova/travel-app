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
  const dateEnd = document.getElementById('dateEnd').value

  createTrip({ city, date, dateEnd }).then(renderCity)
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

const renderCity = (trips) => {
  document.getElementById('allTrips').innerHTML = ''
  for( let i = 0; i < trips.length; i++ ){
    
    const oneDay = 24 * 60 * 60 * 1000
    const firstDate = new Date(document.getElementById('date').value)
    const secondDate = new Date(document.getElementById('dateEnd').value)
    const tripDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
    console.log('tripDays= ', tripDays)
    console.log('oneDay= ', oneDay)
    console.log('secondDate= ', secondDate)

    const photoCity = document.createElement('img')
    const tripDiv = document.createElement("div")
    const trip = document.createElement("div")
    photoCity.src = trips[i].photo
    trip.innerHTML = 'Country: ' + trips[i].country +  '<br>' + 'City: ' + trips[i].city +  '<br>' + 'Travel date: ' + trips[i].date + ' - ' + trips[i].dateEnd+ '<br>' + 'Length of trip: '+ tripDays + '<br>' + 'Longitude: ' + trips[i].longitude + '<br>' + 'Latitude: ' + trips[i].latitude
    
    const weather = renderWeather(trips[i].weather)
    const titleWeather = document.createElement('p')
    titleWeather.innerHTML = 'Weather forecast for the next 16 days:'
    tripDiv.appendChild(photoCity)
    tripDiv.appendChild(trip)
    
    tripDiv.appendChild(titleWeather)
    tripDiv.appendChild(weather)
    document.getElementById('allTrips').appendChild(tripDiv)
    
  }
 
  console.log('trips= ', trips)
  
}

const countDay = () => {
  const oneDay = 24 * 60 * 60 * 1000
  const firstDate = new Date(2020, 2, 5)
  const secondDate = new Date(2020, 2, 25)

 diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

const renderWeather = (weather) => {
  console.log('weather=',weather)
  //document.getElementById('weather').innerHTML = ''
  const tripWeather = document.createElement('div')
  tripWeather.classList.add('weather')
  for (let i = 0; i < weather.length; i++) {
    const box = document.createElement("div") 
    box.classList.add('weatherDay')  
    box.innerHTML = "Date: " + weather[i].day + '<br>'+ "Temperature: " + weather[i].temp
    tripWeather.appendChild(box)
    //document.getElementById('weather').appendChild(box)
  }
  return tripWeather
}
//renderWeather()

getSavedCityData().then(renderCity)

export { action }