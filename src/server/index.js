require('dotenv').config()

const geoName = require('./geoname')
const weatherCity = require('./weather')
const photoCity = require('./photoCity')
const infoCountry = require('./restcountries')

const express = require('express');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

const port = 8000;
const server = app.listen(port, listening);

function listening(){
  console.log("server running"); 
  console.log(`running on localhost: ${port}`);
}

let trips = [ ]

app.get('/trip', function (req, res) {
  res.send(trips)
})

app.post('/trip', async(req, res) => {
  let data = req.body
  const allCity = await geoName.getCityData(data.city)
  const allWeatherCity = await weatherCity.getWeatherData(data.city)
  let allPhotoCity = await photoCity.getPhotoData(data.city)

  if(allPhotoCity.data.hits.length === 0){
    allPhotoCity = await photoCity.getPhotoData(allCity.data.geonames[0].countryName)
  } 

  const infoRestCountry = await infoCountry.getCountryData(allCity.data.geonames[0].countryName)

  trips.unshift({
    'id': Math.random().toString(36).substr(2, 9),
    'photo': allPhotoCity.data.hits[0].webformatURL,
    'city': data.city, 
    'date': data.date,
    'dateEnd': data.dateEnd,
    'country': allCity.data.geonames[0].countryName,
    'longitude': allCity.data.geonames[0].lng,
    'latitude': allCity.data.geonames[0].lat,
    'weather': allWeatherCity.data.data.map(day => ({day: day.valid_date, temp: day.temp})),
    'population': infoRestCountry.data.map(i=>i.population),
    'fullName': infoRestCountry.data.map(i=>i.altSpellings[1]),
    'currency': infoRestCountry.data.map(i=>i.currencies[0]['name'])
  })   
  console.log(trips)
  res.send(trips)
})

//remove a trip by id
app.delete('/delete/:id', (req, res) => { 
  let id = req.params['id']
  trips = trips.filter(el => id !== el['id'] )

  res.send(trips)
}) 

