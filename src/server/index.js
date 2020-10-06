var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
let projectData = {}; //Create empty JS object to act as endpoint for weather data

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// console.log(JSON.stringify(mockAPIResponse))

//GET routes
app.get('/all', function (req, res) {
    console.log("Get request received")
    res.sendFile('dist/index.html')
    res.send(projectData);
    console.log(projectData);
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

//POST route
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    projectData.temperature = req.body.temperature;
    res.end();
    console.log(projectData);
}
