import React, { useEffect, useState } from "react";
import axios from "axios";
import DarkModeToggle from 'react-dark-mode-toggle';  // Componente en mayúscula
import { useSpring, animated } from "react-spring";
import './App.css'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (e) => setCity(e.target.value);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(`https://wttr.in/${cityName}?format=%t`);
      setWeather(response.data);
    } catch (err) {
      setError('No se puede obtener los datos');
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchWeather(userLocation);
    }
  }, [userLocation]);
  if(darkMode){
    document.body.classList.add('dark-mode');
  } else{
    document.body.classList.remove('dark-mode');
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude},${longitude}`);
        },
        () => {
          setError('No se pudo obtener la ubicación');
        }
      );
    } else {
      setError('Tu navegador no soporta Geolocalización');
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const darkModeStyle = useSpring({
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
  });

  return (
    <div className="App" style={darkModeStyle}>
      <header className="App-header">
        <h1>App del Clima</h1>

        <DarkModeToggle
          onChange={setDarkMode}
          checked={darkMode}
          size={60}
        />

        <button onClick={getUserLocation}>Obtener mi ubicación</button>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            aria-label="Ciudad"
            placeholder="Ciudad"
          />
          <button type="submit">Buscar</button>
        </form>

        {error && <p role="alert">{error}</p>}
        {weather && (
          <animated.div>
            <h2>Clima en {city}</h2>
            <p>{weather}</p>
          </animated.div>
        )}
      </header>
    </div>
  );
}

export default App;
