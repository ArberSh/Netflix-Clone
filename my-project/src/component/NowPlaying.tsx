import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Information {
    Image:string;
    Title:string;
  }

function NowPlaying() {

    const [Data,SetData] = useState<Information[]>([])
    const [Image,SetImage] = useState<string>('')
    

    useEffect(()=>{
    
        async function fetchMovieData() {
          try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=1d64987033e87e832914c3294d337cef')
            const Test = response.data.results
                SetData(
                    Test.map((elem: any) => ({
                    
                      Image: `https://image.tmdb.org/t/p/original${elem.backdrop_path}`,
                      Title: elem.title || elem.name,
                    })))
            }
          
    
         catch (error) {
          console.error(error);
        }
        
      }
      fetchMovieData();
    },[])

  return (
    
    <div className='bg-black p-10'>
        <h1 className='text-white text-xl pb-4 font-bold'>Now Playing Movie</h1>
        <div className='flex flex-row justify-start items-center flex-wrap gap-4'>
         {Data.map((elem, index) => (
            <div key={index} className=' cursor-pointer text-white flex flex-col text-center w-56 transition ease-in-out hover:scale-110'>
                <img className='w-56 rounded-lg' src={elem.Image} alt="" />
            <h1>{elem.Title}</h1>
            </div>
            
      ))}
      </div>
      </div>
  )
}

export default NowPlaying