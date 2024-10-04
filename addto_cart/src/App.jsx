import React, { useReducer } from 'react'
import Navbar from './components/Navbar'
import Product from './pages/Product'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import { cartReducer, initialState } from './Reducer/reducer'

function App() {

  const [state, dispatch]= useReducer(cartReducer, initialState)


  return (
    <>
      <Navbar cartItems={state.cartItems}/>
      <Routes>
        <Route path='/' element={ <Product dispatch= {dispatch}/>}/>
        <Route path='/cart' element={<Cart cartItems={state.cartItems} dispatch={dispatch}/>}/>
      </Routes>
    </>
  )
}

export default App