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

/**
 * make request to backend
 */
const deleteTrip = async(id) => {
  const res = await fetch(`/delete/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  })

  try {
    return await res.json()
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
    let firstDate = new Date(document.getElementById('date').value)
    let secondDate = new Date(document.getElementById('dateEnd').value)
    let tripDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))

    if(isNaN(tripDays)){
      tripDays = 0
    } 

    const photoCity = document.createElement('img')
    const tripDiv = document.createElement("div")
    const divPhotoTrip = document.createElement("div")
    const trip = document.createElement("div")
    photoCity.src = trips[i].photo
    trip.innerHTML = (
      'Country: ' + trips[i].country +  
      '<br>' + 'City: ' + trips[i].city +  
      '<br>' + 'Travel date: ' + trips[i].date + ' - ' + trips[i].dateEnd + 
      '<br>' + 'Length of trip: '+ tripDays + '<br>'+
      '<br>' + 'Country information:' +
      '<br>' + 'Full name of the country: ' + trips[i].fullName +
      '<br>' + 'Currency: ' + trips[i].currency +
      '<br>' + 'Population: ' + trips[i].population +
      '<br>' + 'Longitude: ' + trips[i].longitude + 
      '<br>' + 'Latitude: ' + trips[i].latitude 
    )
    
    const weather = renderWeather(trips[i].weather)
    const titleWeather = document.createElement('p')
    titleWeather.innerHTML = 'Weather forecast for the next 16 days:'
    
    tripDiv.classList.add('tripDiv')

    tripDiv.appendChild(divPhotoTrip)
    divPhotoTrip.classList.add('module')
    divPhotoTrip.appendChild(photoCity)
    divPhotoTrip.appendChild(trip)
    
    const weatherTitleWeather = document.createElement('div')

    weatherTitleWeather.appendChild(titleWeather)
    weatherTitleWeather.appendChild(weather)
    weatherTitleWeather.classList.add('weatherTitleWeather')
    tripDiv.appendChild(weatherTitleWeather)

    document.getElementById('allTrips').appendChild(tripDiv)

    const deleteButton = document.createElement('p')
    deleteButton.innerHTML = 'Remove a trip'
    deleteButton.onclick = function () {
      deleteTrip(trips[i].id).then(renderCity)
    }
    tripDiv.appendChild(deleteButton)

    if( new Date(trips[i].date).getTime() < new Date().getTime() ){
      tripDiv.classList.add('oldTripDiv')
    }
  }
 
  console.log('trips= ', trips)
}

const renderWeather = (weather) => {
  console.log('weather=',weather)
  
  const tripWeather = document.createElement('div')
  tripWeather.classList.add('weather')
  for (let i = 0; i < weather.length; i++) {
    const box = document.createElement("div") 
    box.classList.add('weatherDay')  
    box.innerHTML = "Date: " + weather[i].day + '<br>'+ "Temperature: " + weather[i].temp
    tripWeather.appendChild(box)
  }
  return tripWeather
}

getSavedCityData().then(renderCity)

export { action }