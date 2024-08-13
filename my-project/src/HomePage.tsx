import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios'
import NetflixLogo from './assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png'
import SearchLogo from './assets/SearchLogo.svg'
import ProfileLogo from './assets/ProfileLogo.png'
import LogOut from './assets/LogOut.svg'

interface HomePageProps {
  FirstName: string;
  LastName: string;
}



function HomePage() {
  
  const [image,SetImage] = useState<string>('')
  const [Data,SetData] = useState<string>('')
  const imagePath = `https://image.tmdb.org/t/p/original${image}`
  const RandomNumberForResults = Math.floor(Math.random() * 20)
  const RandomNumberForKnown_for = Math.floor(Math.random() * 3)
  
  useEffect(()=>{
  async function fetchMovieData() {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/person/popular?language=en-US&api_key=1d64987033e87e832914c3294d337cef');
      // console.log(response.data.results);
      SetData(response.data.results[RandomNumberForResults].known_for[RandomNumberForKnown_for])
      SetImage(response.data.results[RandomNumberForResults].known_for[RandomNumberForKnown_for].backdrop_path)
    } catch (error) {
      console.error(error);
    }
  }
  fetchMovieData();
  },[])
  return (
    <>
    <div className='h-screen bg-cover bg-no-repeat' style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 1) ,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imagePath})`}}>
      <div className='flex justify-center items-center '
    >
        <img className='w-40' src={NetflixLogo} alt="Netflix Logo" />
        <input type="text" className='mx-6 bg-black bg-opacity-0 w-full max-w-96 text-white outline-none h-6 text-lg' placeholder='Movies Tv Shows Search History' />
        <div className='flex justify-center items-center'>
        <button className='px-2'>
          <img className='min-w-6' src={SearchLogo} alt="" />
        </button>
        <button className='px-2'>
          <img className='w-6 min-w-6' src={ProfileLogo} alt="" />
        </button>
        <button className='px-2'>
          <img className='min-w-6' src={LogOut} alt="" />
        </button>
        </div>
      </div>
        {/* LANDING */}
      <div className='flex justify-start items-center h-3/5 px-32'>
        <div className='flex justify-center items-start flex-col' >
          <h1 className='text-white text-4xl'>{Data.title}</h1>
          <h1 className='text-white text-sm'>Date 2024 a ku di un</h1>
          <p className='text-white mt-4'>PARAGRAF AAAAAAAAAAAAA</p>
          <div className='flex gap-4 mt-6'>
            <button className='bg-white text-black p-2'>Play</button>
            <button className='bg-gray text-white p-2'>More Info</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

//1d64987033e87e832914c3294d337cef

export default HomePage;