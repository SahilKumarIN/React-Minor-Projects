import React, { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeatherForCity = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_OPEN_WEATHER_APP_KEY
        }`
      );
      onCitySelect(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${searchQuery}&type=like&sort=population&cnt=5&appid=${
            import.meta.env.VITE_OPEN_WEATHER_APP_KEY
          }`
        );
        setSuggestions(response.data.list);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSearchClick = () => {
    fetchWeatherForCity(query);
    setQuery("");
    setSuggestions([]);
  };

  const handleClick = (city) => {
    onCitySelect(city);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <Box mt={5} p={3} sx={{ maxWidth: 600, mx: "auto" }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Weather App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Search for a city to get the latest weather updates and forecasts.
        </Typography>
      </Box>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search City"
          variant="outlined"
          fullWidth
          size="small"
          value={query}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Box>
      {query !== "" && suggestions.length === 0 && (
        <Typography>No Cities found for {query}!</Typography>
      )}
      <List>
        {suggestions.map((city) => (
          <ListItem key={city.id} button onClick={() => handleClick(city)}>
            <ListItemText primary={`${city.name}, ${city.sys.country}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchBar;
