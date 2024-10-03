import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        setError("Error fetching weather data");
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress /></Box>;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  if (!weather) return null;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{city.name}</Typography>
        <Typography variant="body1" gutterBottom>Temperature: {weather.main.temp}°C</Typography>
        <Typography variant="body1" gutterBottom>Humidity: {weather.main.humidity}%</Typography>
        <Typography variant="body1" gutterBottom>Wind Speed: {weather.wind.speed} m/s</Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
            Weather Condition: {weather.weather[0].description.toUpperCase()}
          </Typography>
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
            alt="weather icon" 
            style={{ width: 50, height: 50, marginRight: 8 }} 
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
