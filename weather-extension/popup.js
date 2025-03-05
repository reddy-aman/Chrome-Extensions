document.getElementById('getWeather').addEventListener('click', function() {
  // Check if geolocation is supported
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Call weather API with the coordinates
      getWeather(lat, lon);
    }, function(error) {
      let errorMessage = "Unable to retrieve your location.";
      if (error.code === error.PERMISSION_DENIED) {
        errorMessage = "Permission to access location was denied.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMessage = "Location information is unavailable.";
      } else if (error.code === error.TIMEOUT) {
        errorMessage = "The request to get user location timed out.";
      }
      document.getElementById('weather').innerHTML = errorMessage;
    });
  } else {
    document.getElementById('weather').innerHTML = "Geolocation is not supported by this browser.";
  }
});

function getWeather(lat, lon) {
  const apiKey = ''; // Replace with your own API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = `
        <h4>Weather for ${data.name}</h4>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;
      document.getElementById('weather').innerHTML = weatherInfo;
    })
    .catch(error => {
      document.getElementById('weather').innerHTML = "Unable to fetch weather data.";
    });
}
