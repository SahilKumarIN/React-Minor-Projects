import React from 'react'

function Home() {
  return (
    <div className='bg-gray-300 dark:bg-gray-900 min-h-screen flex items-center justify-center'>
        <div className="container flex flex-col items-center justify-center text-black dark:text-white">
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>Welcome to Home Page</h2>
          <p className="text-xl md:text-2xl lg:text-4xl mb-8 text-center max-w-2xl">Your ultimate platform for everything. Connect, compete, and thrive!</p>
        </div> 
    </div>
  )
}

export default Home
