import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import TemperatureChart from "./components/TemperatureChart";
import Footer from "./components/Footer";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Grid,
} from "@mui/material";

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    console.log(selectedCity);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h6">Weather App</Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 2,
        }}
      >
        <SearchBar onCitySelect={handleCitySelect} />
        {selectedCity && (
          <Box mt={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <WeatherCard city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Forecast city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TemperatureChart city={selectedCity} />
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
