import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import Navigation from './component/Navigation';
import SimilarMovies from './SimilarMovies';
import YouTubeVid from './component/Youtube';

interface DataYouTube{
  Id_YT:string;
}

interface Data {
  id:number;
  NameTitle:string;
  description:string;
  data:number;
}


function InfoMovies() {

  const { id } = useParams();
  const [Data,SetData] = useState<Data | null >(null)

  const [Loading,setLoading] = useState(true)
  const [Image,setImage] = useState('')
  const imagePath = `https://image.tmdb.org/t/p/original${Image}`;
  const [genre,setGenre] = useState<string[]>([])


  // useEffect(()=>{
  //   async function GetDataYoutube() {
  //     try{
  //       const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=1d64987033e87e832914c3294d337cef`)
  //       console.log(response.data.results[0].key)
  //       SetDataYT([{ Id_YT: response.data.results[0].key }]);
  //       setLoading(false)
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  //   }
  //   GetDataYoutube()
  // },[])
  
  
  useEffect(()=>{
    async function GetData() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=1d64987033e87e832914c3294d337cef`) 
     setImage(response.data.poster_path)
     const genres = response.data.genres.map((elem: any) => elem.name);
        setGenre(genres);
        setTimeout(()=>{
          setLoading(false)
        },300)
      SetData({
        id:response.data.id,
        NameTitle:response.data.original_title,
      description:response.data.overview,
      data:response.data.release_date,
    })
    }
    catch(error){
      console.log(error)
    }
  }
  GetData()
},[])
console.log(genre)
  return (
    <>
    {Loading ? (
      <div className="bg-black h-screen shimmer"></div>
    ) : (
      <div className='bg-black h-screen'>
    <Navigation></Navigation>
    <div className='flex justify-center items-center h-screen max-[640px]:items-start max-[640px]:py-20 max-[640px]:h-96'>
      <div className='py-6'>
      <YouTubeVid></YouTubeVid>
    </div>
    </div>
    <div className='bg-black h-screen justify-center flex items-center p-6 max-[640px]:flex-col-reverse'>
      <div key={Data?.id} className='text-white flex justify-center items-start flex-col max-w-160 w-full max-[640px]:pt-6 px-4 '>
        <h1 className='text-start text-3xl font-bold'>{Data?.NameTitle}</h1>
        <h2 className='pb-2'>{Data?.data}</h2>
          <h1 className='text-white font-bold '>Genres</h1>
        <div className='pb-4  flex justify-center items-center gap-2'>
        {genre.map((elem,index)=>(
          <div key={index}>
          <h1 className='text-white '>{elem}</h1>
          </div>
        ))}
        </div>
        <p>{Data?.description}</p>
      </div>
      <div className='flex justify-center items-center px-10'>
        <img className='w-72' src={imagePath} alt="" />
      </div>
    </div>
    <div className='h-96 bg-black pt-10'>
      <SimilarMovies></SimilarMovies>
    </div>
    </div>
    )}
    </>
  )
}

export default InfoMovies