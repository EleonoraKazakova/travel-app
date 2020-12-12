import { deleteTrip } from './requests'

const renderTrip = (trips) => {
  document.getElementById('allTrips').innerHTML = ''
  for (let i = 0; i < trips.length; i++) {

    const tripDiv = document.createElement("div")
    tripDiv.classList.add('tripDiv')

    const deleteButton = createDeleleButton(trips[i])
    tripDiv.appendChild(deleteButton)

    if (isOld(trips[i].date)) {
      const finishedTrip = createFinishedTrip()
      tripDiv.appendChild(finishedTrip)
      tripDiv.classList.add('oldTripDiv')
    }

    const divPhotoTrip = createDivPhotoTrip(trips[i])
    tripDiv.appendChild(divPhotoTrip)

    const weatherBlock = createWeatherBlock(trips[i])
    tripDiv.appendChild(weatherBlock)

    document.getElementById('allTrips').appendChild(tripDiv)
  }
}

const createWeatherBlock = (trip) => {
  const weatherBlock = document.createElement('div')

  const titleWeather = document.createElement('p')
  titleWeather.innerHTML = 'Weather forecast for the next 16 days:'
  weatherBlock.appendChild(titleWeather)

  const weather = renderWeather(trip.weather)
  weatherBlock.appendChild(weather)
  weatherBlock.classList.add('weatherBlock')

  return weatherBlock
}

const createDivPhotoTrip = (trip) => {
  const divPhotoTrip = document.createElement("div")
  divPhotoTrip.classList.add('module')

  const photoCity = document.createElement('img')
  photoCity.classList.add('photo')
  photoCity.src = trip.photo
  divPhotoTrip.appendChild(photoCity)

  const tripText = createTripText(trip)
  divPhotoTrip.appendChild(tripText)

  return divPhotoTrip
}

const renderWeather = (weather) => {
  const tripWeather = document.createElement('div')
  tripWeather.classList.add('weather')
  for (let i = 0; i < weather.length; i++) {
    const box = document.createElement("div")
    box.classList.add('weatherDay')
    box.innerHTML = "Date: " + weather[i].day + '<br>' + "Temperature: " + weather[i].temp
    tripWeather.appendChild(box)
  }
  return tripWeather
}

const isOld = date => new Date(date).getTime() < new Date().getTime()

const createFinishedTrip = () => {
  const finishedTrip = document.createElement('p')
  finishedTrip.innerHTML = 'The trip ended'
  finishedTrip.classList.add('moduleTripEnd')
  return finishedTrip
}

const createTripText = (trip) => {
  const oneDay = 24 * 60 * 60 * 1000
  let firstDate = new Date(trip.date)
  let secondDate = new Date(trip.dateEnd)
  let tripDays = Math.round(Math.abs((firstDate - secondDate) / oneDay) + 1)

  if (isNaN(tripDays)) {
    tripDays = 0
  }

  const tripText = document.createElement("div")
  tripText.innerHTML = (
    'Country: ' + trip.country +
    '<br>' + 'City: ' + trip.city +
    '<br>' + 'Travel date: ' + trip.date + ' - ' + trip.dateEnd +
    '<br>' + 'Length of trip: ' + tripDays + '<br>' +
    '<br>' + 'Country information:' +
    '<br>' + 'Full name of the country: ' + trip.fullName +
    '<br>' + 'Currency: ' + trip.currency +
    '<br>' + 'Population: ' + trip.population +
    '<br>' + 'Longitude: ' + trip.longitude +
    '<br>' + 'Latitude: ' + trip.latitude
  )

  return tripText
}

const createDeleleButton = (trip) => {
  const deleteButton = document.createElement('div')
  deleteButton.classList.add('click')
  deleteButton.innerHTML = 'Remove a trip'
  deleteButton.onclick = function () {
    deleteTrip(trip.id).then(renderTrip)
  }
  return deleteButton
}

export { renderTrip, isOld }