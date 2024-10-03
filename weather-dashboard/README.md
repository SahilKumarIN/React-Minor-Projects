# Weather Dashboard

A weather dashboard application that provides current weather conditions, a 5-day forecast, and a temperature trend chart for a selected city. Built with React, Material-UI, and Recharts.

## Project Structure

- `src/`
  - `components/`
    - `SearchBar.jsx` - A search bar component that allows users to search for cities.
    - `WeatherCard.jsx` - Displays current weather data for the selected city.
    - `Forecast.jsx` - Shows a 5-day weather forecast.
    - `TemperatureChart.jsx` - Visualizes temperature trends using a line chart.
  - `App.jsx` - Main application component that integrates all the components and manages state.
  - `main.jsx` - Entry point of the application where React is rendered.
  - `index.css` - Global styles for the application.
  - `App.css` - Styles specific to the `App` component.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/HarshSharmaIN/weather-app.git
   cd weather-dashboard
  ```
2. **Install Dependencies**
  Ensure you have Node.js installed. Then run:
  ```bash
  npm install
  ```
3. **Configure Environment Variables**
  Create a .env file in the root of your project and add your OpenWeather API key:
  ```bash
  VITE_OPEN_WEATHER_APP_KEY=your_openweather_api_key
  ```
4. **Run the Application**
  Start the development server with:
  ```bash
  npm run dev
  ```

## How to Use

1. **Search for a City**
  Use the search bar to enter the name of a city. Click the "Search" button or select a city from the suggestions to see its weather details.

2. **View Weather Information**
  Once a city is selected, the WeatherCard will display current weather conditions including temperature, humidity, wind speed, and a weather icon.

3. **Check the 5-Day Forecast**
  The Forecast component shows a 5-day forecast with average temperatures and weather conditions.

4. **Analyze Temperature Trends**
  The TemperatureChart provides a line chart of temperature trends over the next 24 hours.

## Project Details

- React: JavaScript library for building user interfaces.
- Material-UI: React components for faster and easier web development.
- Recharts: Chart library for React, used to visualize temperature trends.
- Axios: Promise-based HTTP client for making API requests.

## Contact
  For any questions or suggestions, please contact your.email@example.com.