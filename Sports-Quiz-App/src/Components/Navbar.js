import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <div className='navbar'>
        <Link to="/">
          <h1> Quiz Game</h1>
        </Link>
        <span>
          <Link to="/about">About</Link>
        </span>
        <span>
          <Link to="/rules">Rules</Link>
        </span>
      </div>
    </>
  )
}
