import React, { useRef, useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios'
import NetflixLogo from './assets/png-clipart-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-thumbnail-removebg-preview.png'
import SearchLogo from './assets/SearchLogo.svg'
import ProfileLogo from './assets/ProfileLogo.png'
import LogOut from './assets/LogOut.svg'
import Play from './assets/Play.svg'
import info from './assets/info.svg'
import NowPlaying from './component/NowPlaying';

interface Information {
  Image:string;
  Title:string;
  Date:string;
  description:string;
}



function HomePage() {
  
  const [image1,SetImage] = useState<string>('')
  const mountedRef = useRef<boolean>(true)
  const [Data,SetData] = useState<Information | null>(null)
  const imagePath = `https://image.tmdb.org/t/p/original${Data?.Image}`
  const [Loading,SetLoading] = useState<boolean>(true)
  

  
  useEffect(()=>{
    
      async function fetchMovieData() {
        try {
          const response = await axios.get('https://api.themoviedb.org/3/person/popular?language=en-US&api_key=1d64987033e87e832914c3294d337cef')
          const Test = response.data.results
          let FilteredData1 :any[] = []
          Test.map((elem: any) => {
            const FilteredData = elem.known_for.filter((elem:any) => elem.backdrop_path !== null)
            FilteredData.map((elem : any) => {
              FilteredData1.push(elem)
              const RandomNumberForResults = Math.floor(Math.random() * FilteredData1.length)
              const Data = FilteredData1[RandomNumberForResults]
              SetData({
                Image: Data.backdrop_path,
                Title: Data.title || Data.name, // Handle both movie titles and TV show names
                Date: Data.release_date || Data.first_air_date, // Handle both movie and TV show dates
                description: Data.overview,
              })
              
            })
          })
  
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchMovieData();
    
  },[])

  useEffect(() => {
    var img = new Image();
      img.onload = function () {
        setTimeout(() => {
          SetLoading(false)
        },(300))
   
  }
img.src = imagePath
  },[Data])
  
  return (
    <>
    
      {Loading ? <div className='bg-black h-screen shimmer'></div> : 
      
      <div className='h-screen bg-cover bg-no-repeat bg-center' style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 1) ,rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${imagePath})`}}>
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
      <div className='flex justify-start items-center h-3/5 px-32 max-[640px]:px-8'>
        <div className='flex justify-center items-start flex-col' >
          <h1 className='text-white text-4xl font-BlackHanSans '>{Data?.Title}</h1>
          <h1 className='text-white text-sm'>{Data?.Date}</h1>
          <p className='text-white mt-4 w-full max-w-160 line-clamp-3'>{Data?.description}</p>
          <div className='flex gap-4 mt-6'>
            <button className='bg-white text-black p-2 flex items-center justify-center gap-1'>
              <img className='w-5' src={Play} alt="" />
              <h2 className='text-base font-semibold'>Play</h2>
              </button>
            <button className='bg-gray text-white p-2 flex items-center justify-center gap-1'>
              <img src={info} alt="" />
              <h2 className='text-base font-semibold'>More Info</h2>
              </button>
          </div>
        </div>
      </div>
    </div> 
      }
  
   
    
      <div>
       <NowPlaying></NowPlaying>
      </div>
    </>
  )
}

export default HomePage;