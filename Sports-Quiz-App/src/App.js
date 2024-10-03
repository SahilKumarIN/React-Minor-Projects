import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Style/style.css";
import "./Style/responsive.css"
import About from './Components/About';
import Rules from './Components/Rules';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/rules' element={<Rules/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
