import React from 'react'
import Logo from '../src/assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png'

function Introduction() {
  return (
    <div className=" bg-no-repeat bg-cover bg-Background-Netflix h-screen">
        <div className=' fixed flex-row justify-between items-center px-4 z-10'>
            <img className='w-36' src={Logo} alt="" />
            <button className=' font-semibold text-white w-20 h-10 bg-red'>Sign In</button>
        </div>
        <div className='flex justify-center items-center h-screen'>
        <div className='flex justify-center items-center flex-col h-full'>
            <h1 className='font-bold text-3xl text-white'>Unlimited films, TV programmes and more.</h1>
            <h3 className='mt-4 text-3xl text-white'>Watch anywhere. Cancel at any time.</h3>
            <h3 className='mt-4 text-xl text-white'>Ready to watch? Enter your email to create or restart your membership.</h3>
            <button className='w-36 h-12 bg-red font-bold text-white mt-4'>GET STARTED</button>
        </div>
        </div>
    </div>
  )
}

export default Introduction