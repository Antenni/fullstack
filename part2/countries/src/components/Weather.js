import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
const[weatherreport,setweatherreport] = useState({
  location: {},
  current: {}
})
const api_key = process.env.REACT_APP_API_KEY
const rootUrl = `http://api.weatherstack.com`
const capitalWeather = `${rootUrl}/current?access_key=${api_key}&query=${capital}`

useEffect(() => {
  axios
  .get(capitalWeather)
  .then(response => {
    setweatherreport(response.data)
  })
}, [capitalWeather])

return (
  <div>
  <p><b>temperature is:</b> {weatherreport.current.temperature} Celsius</p>
  <img src={weatherreport.current.weather_icons} alt='icon' />
  <p><b>wind:</b>{weatherreport.current.wind_speed} m/s, direction {weatherreport.current.wind_dir}</p>
  </div>
)
}
export default Weather