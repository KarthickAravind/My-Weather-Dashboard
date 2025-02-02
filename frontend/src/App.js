import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://my-weather-dashboard-egau.onrender.com', { name: city });
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please check your connection and try again.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <form onSubmit={fetchWeather} className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="temperature">{weather.main.temp} °C</p>
          <p className="condition">{weather.weather[0].description}</p>
          <p className="humidity">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;