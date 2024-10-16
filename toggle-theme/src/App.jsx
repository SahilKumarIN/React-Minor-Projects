import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from './context/theme';

function App() {

  const [themeMode, setThemeMode]= useState('light');

  const darktheme =()=>{
    setThemeMode('dark')
  }

  const lightheme =()=>{
    setThemeMode('light')
  }
  useEffect(()=>{
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(themeMode)
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode, darktheme, lightheme }}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App
