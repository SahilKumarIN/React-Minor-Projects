import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
        );
        const dailyForecast = [];
        response.data.list.forEach((entry) => {
          const date = new Date(entry.dt * 1000).toLocaleDateString();
          const existingEntry = dailyForecast.find((item) => item.date === date);
          if (existingEntry) {
            existingEntry.temps.push(entry.main.temp);
          } else {
            dailyForecast.push({
              date,
              temps: [entry.main.temp],
              description: entry.weather[0].description,
              icon: entry.weather[0].icon,
            });
          }
        });
        dailyForecast.forEach((entry) => {
          entry.avgTemp = entry.temps.reduce((sum, temp) => sum + temp, 0) / entry.temps.length;
        });
        setForecast(dailyForecast.slice(0, 6));
      } catch (error) {
        setError("Error fetching forecast data");
        console.error("Error fetching forecast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress /></Box>;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  if (!forecast.length) return null;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>6-Day Forecast</Typography>
        <Grid container spacing={2}>
          {forecast.map((day, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Date: {day.date}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Avg Temp: {day.avgTemp.toFixed(2)}°C
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <img 
                      src={`http://openweathermap.org/img/wn/${day.icon}.png`} 
                      alt="weather icon" 
                      style={{ width: 50, height: 50, marginRight: 8 }} 
                    />
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {day.description.toUpperCase()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Forecast;
