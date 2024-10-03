import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import axios from 'axios';
import { CircularProgress, Typography, Box } from '@mui/material';

const TemperatureChart = ({ city }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
        );
        const chartData = response.data.list.map((entry) => ({
          time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          temp: entry.main.temp,
        }));
        setData(chartData);
      } catch (error) {
        setError("Error fetching temperature data");
        console.error("Error fetching temperature data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemperatureData();
  }, [city]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress /></Box>;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  if (!data.length) return null;

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      <Box sx={{ width: '1000px', minWidth: '600px' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10 }} 
              angle={-30} 
              textAnchor="end" 
              interval={0}
              minTickGap={20}
            >
            </XAxis>
            <YAxis 
              tick={{ fontSize: 10 }} 
              domain={['dataMin - 5', 'dataMax + 5']}
            >
              <Label value="Temperature (°C)" angle={-90} position="left" offset={-7} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TemperatureChart;
