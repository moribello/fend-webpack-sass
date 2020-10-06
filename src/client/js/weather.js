/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//Create a human-friendly date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let dateString = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
//console.log(`Today is ${dateString}`);


/* Function called by event listener */
function getWeather(evt){
    console.log("::: Checking for weather data :::")
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
    const apiKey = '&APPID=823ffab6e94c31871a1e73f0a8bc0149'// Personal API Key for OpenWeatherMap API
    const zipCode = '02777' //temporarily setting this as a static value
    getAPIData(baseURL, zipCode, apiKey)
      .then(function (APItemp) {
        postData('http://localhost:8081/addWeather', { temperature: APItemp})
          // update UI
          .then(function () {
            updateUI()
          })
      })
  }
//get API DATA function called above
const getAPIData = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL + zipCode + apiKey)
    console.log(response);
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error); //deal with error
    }
  };

// Async postData function called during button click event
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
    },
      body: JSON.stringify(data),
    });
    try {
      const newData = await postRequest.json();
      return newData;
    }
    catch (error) {
      console.log('Error during POST: ', error); //signal error during POST attempt;
    }
  }

//Update the UI using data retrieved from API
const updateUI = async () => {
    const request = await fetch('http://localhost:8081/all');
        try {
            const allData = await request.json();
                let currentTemp = allData.temperature.main.temp;
                let friendlyTemp = (((currentTemp - 273.15) * (9/5)) + 32).toFixed(2); //convert from Kelvin to freedom units because I'm in the US and we lag behind the rest of the world in using metric.
            document.getElementById('result').innerHTML = `Current temperature in Swansea, MA: ${friendlyTemp}\xB0 F`;
        } catch (error) {
            console.log("error", error);
        }
}

export { getWeather }
