import React from 'react';
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
//   useEffect(()=>{
//   async function fetchMovieData() {
//     try {
//       const response = await axios.get('https://api.themoviedb.org/3/person/popular?language=en-US&api_key=1d64987033e87e832914c3294d337cef');
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   fetchMovieData();
//   })
  return (
    <>
    <div>
      {/* NAVIGATION BAR */}
      <div className='flex justify-center items-center bg-black'>
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
    </div>
    </>
  )
}

//1d64987033e87e832914c3294d337cef

export default HomePage;