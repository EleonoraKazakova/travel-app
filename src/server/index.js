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
  weather: ''
}

app.get('/city', function (req, res) {
  res.send(projectData)
})

app.post('/', addData)

function addData(req, res){
  let data = req.body

  projectData['country'] = data.country
  projectData['city'] = data.city
  console.log(data)
  //projectData['date'] = data.date
  projectData['longitude'] = data.longitude
  projectData['latitude'] = data.latitude
  //projectData['weather'] = data.weather

  res.send(projectData)
}