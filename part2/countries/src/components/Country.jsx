import { useEffect, useState } from 'react'
import weatherService from './../services/weather'
import { weatherDescriptions } from '../constants/weather'

const CountryWeather = ({capital, weather}) => {
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {weather.current.temperature_2m} Celsius</div>
      <div>{weatherDescriptions[weather.current.weather_code]}</div>
      <div>Wind {weather.current.wind_speed_10m} m/s</div>
    </div> 
  )
}

const Country = ({country}) => {

  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    weatherService
      .getCurrentWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(initialWeather => {
        setWeather(initialWeather)
      })
  }, [country])
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      {weather && <CountryWeather capital={country.capital[0]} weather={weather} />}
    </div> 
  )
}

export default Country