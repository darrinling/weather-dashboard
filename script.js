var city = document.getElementById('citySearch');
var searchBtn = document.getElementById('searchBtn');
var currentSearch = document.getElementById('currentSearch');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');

searchBtn.addEventListener("click", saveData);
city.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    saveData();
  }
});

function initialDisplay() {
  localStorage.setItem('city', 'Boulder');
  getLatLon();
}

function saveData() {
  let searched = city.value;
  localStorage.setItem('city', searched);
  getLatLon();
}

//

function getLatLon() {
  var options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  };
  var auth = 'id=0c8c16e2fdc01233e92bac3bc391f34b'
  var searchLocation = localStorage.getItem('city');

  var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchLocation + '&limit=1&app' + auth;


  fetch(url, options)
    .then(function(response) {
      return response.json();
      // console.log(response);
    })
    .then(function(data) {
      // console.log(data[0]);
      localStorage.setItem('lat', data[0].lat);
      localStorage.setItem('lon', data[0].lon);
      getWeather();
    })
  }

  function getWeather() {
    var options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    };
    var auth = 'id=7c89d26b9ab13abc136a3c8794e870a7';

    var lat = localStorage.getItem('lat');
    var lon = localStorage.getItem('lon');

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly&units=imperial&app' + auth;

    fetch(url, options)
      .then(function(response) {
        return response.json();
        // console.log(response);
      })
      .then(function(data) {
        console.log(data);
        currentSearch.innerHTML = localStorage.getItem('city') + ' ' + '(' + moment().format('MMMM Do YYYY') + ') ' + '<img style="max-width:10%" src="http://openweathermap.org/img/wn/02d@2x.png" />';
        temp.textContent = "Temperature: " + data.current.temp + "°F";
        wind.textContent = "Wind Speed: " + data.current.wind_speed + " mph";
        humidity.textContent = "Humidity: " + data.current.humidity + '%';
        uv.textContent = "UV Index: " + data.current.uvi;
        day1.innerHTML = moment().add(1, 'd').format('MMMM Do YYYY') + ') ' + '<img style="max-width:10%" src="http://openweathermap.org/img/wn/02d@2x.png" />' + '<br>Temp: ' + data.daily[1].temp.day + '°F' + '<br>Wind: ' + data.daily[1].wind_speed + ' MPH' + '<br>Humidity: ' + data.daily[1].humidity + '%';
        day2.innerHTML = moment().add(2, 'd').format('MMMM Do YYYY') + ') ' + '<img style="max-width:10%" src="http://openweathermap.org/img/wn/02d@2x.png" />' + '<br>Temp: ' + data.daily[2].temp.day + '°F' + '<br>Wind: ' + data.daily[2].wind_speed + ' MPH' + '<br>Humidity: ' + data.daily[2].humidity + '%';
        day3.innerHTML = moment().add(3, 'd').format('MMMM Do YYYY') + ') ' + '<img style="max-width:10%" src="http://openweathermap.org/img/wn/02d@2x.png" />' + '<br>Temp: ' + data.daily[3].temp.day + '°F' + '<br>Wind: ' + data.daily[3].wind_speed + ' MPH' + '<br>Humidity: ' + data.daily[3].humidity + '%';
        day4.innerHTML = moment().add(4, 'd').format('MMMM Do YYYY') + ') ' + '<img style="max-width:10%" src="http://openweathermap.org/img/wn/02d@2x.png" />' + '<br>Temp: ' + data.daily[4].temp.day + '°F' + '<br>Wind: ' + data.daily[4].wind_speed + ' MPH' + '<br>Humidity: ' + data.daily[4].humidity + '%';
        day5.innerHTML = moment().add(5, 'd').format('MMMM Do YYYY') + ') ' + '<img style="max-width:10%" src="http://openweathermap.org/img/wn/02d@2x.png" />' + '<br>Temp: ' + data.daily[5].temp.day + '°F' + '<br>Wind: ' + data.daily[5].wind_speed + ' MPH' + '<br>Humidity: ' + data.daily[5].humidity + '%';

      })
    }

    initialDisplay();
