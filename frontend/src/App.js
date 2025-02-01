import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/weather/', { name: city });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please check your connection and try again.');
    }
  };

  return (
    <div className="App">
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;