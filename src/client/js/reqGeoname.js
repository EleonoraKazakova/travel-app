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
  const table = document.createElement("TABLE");
  
  for (let i = 0; i < weather.length; i++) {

    const row = table.insertRow(i)
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)

    cell1.innerHTML = "Date: " + weather[i].day
    cell2.innerHTML = "Temperature: " + weather[i].temp
    
  }

  document.getElementById('weather').innerHTML = ''
  document.getElementById('weather').appendChild(table)

}

getSavedCityData().then(renderCity)

export { action }