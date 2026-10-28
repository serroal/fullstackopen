import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getCurrentWeather = (lat, lng) => {
  const request = axios.get(
    `${baseUrl}?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code&wind_speed_unit=ms`)
  return request.then(response => response.data)
}

export default { getCurrentWeather }