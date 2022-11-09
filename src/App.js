import './App.css';
import Input from './components/input/Input';
import axios from 'axios';
import { useEffect, useState } from 'react';




function App() {
  const [userLocation, setUserLocation] = useState('')
  const [degrees, setDegrees] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [country, setCountry] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  
  
  const API_KEY = '4a7bbf40328f23ce3c6b08a74ef3024c';
  let timing = new Date().toLocaleString();
  
  const [time, setTime] = useState(timing);

  const fetchData = async (e) =>{
    e.preventDefault();
    
    try{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${API_KEY}&units=metric`);
      const data = await res.data;
      
      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      setDataFetched(true);

      // console.log(data);
    } catch(err){
      console.log(err);
      alert ('please insert a valid location name');
    }
    
    

  }

  const defaultDataFetched = async () => {
    if(!dataFetched){
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${API_KEY}&units=metric`);
      const data = await res.data;
      
      
      setDegrees(data.main.temp);
      setLocation(data.name);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
     
    }
    
  }

  useEffect(() => {
    defaultDataFetched(); 
    setInterval(() =>{
      setTime(timing)
    },1000)
  });


  return (
    <div className="App">
      <div className="weather">
        <Input 
          text={(e)=>setUserLocation(e.target.value)}
          submit={fetchData} 
          func = {fetchData}
          /> 
        <div className="weather_display">
          <h3 className="weather_location">Weather in {location}</h3>
          <div>
            <h1 className="weather_degrees">{degrees} °C</h1>
          </div>
          <div className="weather_description">
            <div >
              <div className='weather_description_head'>
                <span className='weather_icon'>
                  <img src={`http://openweathermap.org/img/w/${icon}.png`} alt='weather icon'/>
                </span>
                <h3>{description}</h3>
              </div>
              <h3>Humidity: {humidity}%</h3>
              <h3>Wind Speed: {wind} m/s </h3>
            </div>
            <div className='weather_country'>
              <h3>{country}</h3>
              <h2 className='weather_date'>{timing}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
