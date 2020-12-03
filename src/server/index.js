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

const projectData = {
  country: '',
  city: '',
  date: '',
  longitude: '',
  latitude: '',
  weather: '',
  photo: ''
}

app.get('/trip', function (req, res) {
  res.send(projectData)
})

app.post('/trip', async(req, res) => {
  let data = req.body
  const allCity = await geoName.getCityData(data.city)
  const allWeatherCity = await weatherCity.getWeatherData(data.city)
  const allPhotoCity = await photoCity.getPhotoData(data.city)

  console.log('allPhotoCity = ',  allPhotoCity.data.hits[0])
  projectData['city'] = data.city
 
  projectData['date'] = data.date
  projectData['country'] = allCity.data.geonames[0].countryName
  projectData['longitude'] = allCity.data.geonames[0].lng
  projectData['latitude'] = allCity.data.geonames[0].lat
  projectData['weather'] = allWeatherCity.data.data.map(day => ({day: day.valid_date, temp: day.temp}))
  projectData['photo'] = allPhotoCity.data.hits[0].webformatURL

  res.send(projectData)
})

