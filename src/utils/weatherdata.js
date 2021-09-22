const axios = require("axios");

const getCurrentWeather = (address) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7dceac42cf5a4c0f3a3aeac3802680ad&query=" +
    encodeURIComponent(address);
  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Unable to fetch data!");
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then((response) => {
      return {
        weatherDesc: response.data.current.weather_descriptions,
        location: response.data.location.name,
        country: response.data.location.country,
        region: response.data.location.region,
        currentTemp: response.data.current.temperature,
        humidity: response.data.current.humidity,
        pressure: response.data.current.pressure,
        feelsLike: response.data.current.feelslike,
      };
    });
};
// getCurrentWeather("Delhi")
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = getCurrentWeather;
