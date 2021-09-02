function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  // let minutes = date.getMinutes();
  // if (minutes < 10) { minutes = `0${minutes}`; }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
//Update city name on search
function search(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-form");
  document.querySelector("#city").innerHTML = userInput.value;
}

//let form = document.querySelector("#search-form");
//.addEventListener("submit", handleSubmit);

//get forecast
function displayTemperture(response) {
  let mainTemperture = document.querySelector("#main-temperture");
  let mainCity = document.querySelector("#city");
  let mainDescription = document.querySelector("#main-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let mainIcon = document.querySelector("#main-icon");

  celsiusTemperture = response.data.main.temperture;

  mainTemperture.innerHTML = Math.round(celsiusTemperture);
  mainCity.innerHTML = response.data.name;
  mainDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
  date.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}
function search(city) {
  let units = "metric";
  let defaultCity = "New York";
  let apiKey = "04e088e25ccb622f4891c5136c21db30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperture);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");

function getForecast(coordinates) {
  let apiKey = "04e088e25ccb622f4891c5136c21db30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getPosition(position) {
  let apiKey = "04e088e25ccb622f4891c5136c21db30";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
}

//function getCurrentLocation() {
//  navigator.geolocation.getCurrentPosition(getPosition);}

//function showCurrentLocation(response) {
//let city = document.querySelector("#city-input");
//city.innerHTML = response.data.name;
//let mainTemperature = Math.round(response.data.main.temp);
//let description = document.querySelector("#description");
//description.innerHTML = response.data.weather[0].description;
//let humidity = document.querySelector("#humidity");
//humidity.innerHTML = response.data.main.humidity;
//let wind = document.querySelector("#wind");
//wind.innerHTML = Math.round(response.data.wind.speed);
//document.getElementById("farenheit-link").disabled = false;
//document.getElementById("celsius-link").disabled = true;
//getCurrentLocation(response);}

//let locationButton = document.querySelector("#location");
//locationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperture * 9) / 5 + 32;
  let mainTemperture = document.querySelector("#main-temperture");
  mainTemperture.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperture = Math.round(((temp - 32) * 5) / 9);
  let mainTemperture = document.querySelector("#main-temperture");
  mainTemperture.innerHTML = Math.round(celsiusTemperture);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemperture = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let currentTemperature = temperatureElement.innerHTML;
  currentTemperature = Number(currentTemperature);

  if (celciusFahrenheitLink.innerHTML === "°C") {
    temperatureElement.innerHTML = Math.round(
      (currentTemperature * 9) / 5 + 32
    );
    celciusFahrenheitLink.innerHTML = "°F";
  } else {
    temperatureElement.innerHTML = Math.round(
      ((currentTemperature - 32) * 5) / 9
    );
    celciusFahrenheitLink.innerHTML = "°C";
  }
}

//let celciusFahrenheitLink = document.querySelector("#celcius-fahrenheit");
//celciusFahrenheitLink.addEventListener("click", convertToFahrenheit);
