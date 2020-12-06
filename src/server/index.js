require('dotenv').config()

const geoName = require('./geoname')
const weatherCity = require('./weather')
const photoCity = require('./photoCity')

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

const trips = [ ]

app.get('/trip', function (req, res) {
  res.send(trips)
})

app.post('/trip', async(req, res) => {
  let data = req.body
  const allCity = await geoName.getCityData(data.city)
  const allWeatherCity = await weatherCity.getWeatherData(data.city)
  const allPhotoCity = await photoCity.getPhotoData(data.city)

  console.log('allPhotoCity = ',  allPhotoCity.data.hits[0])

  trips.unshift({
    'photo': allPhotoCity.data.hits[0].webformatURL,
    'city': data.city, 
    'date': data.date,
    'dateEnd': data.dateEnd,
    'country': allCity.data.geonames[0].countryName,
    'longitude': allCity.data.geonames[0].lng,
    'latitude': allCity.data.geonames[0].lat,
    'weather': allWeatherCity.data.data.map(day => ({day: day.valid_date, temp: day.temp})),
    
  })   

  res.send(trips)
})

