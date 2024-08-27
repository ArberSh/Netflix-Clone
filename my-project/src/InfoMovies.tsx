import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';
import Navigation from './component/Navigation';

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
  const [DataYT,SetDataYT] = useState<DataYouTube[]>([])
  const [Loading,setLoading] = useState(true)
  const [Image,setImage] = useState('')
  const imagePath = `https://image.tmdb.org/t/p/original${Image}`;
  const [genre,getgenres] = useState([])

  const opts = {
    height:'500',
    width:'900',
  }
   

  useEffect(()=>{
    async function GetDataYoutube() {
      try{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=1d64987033e87e832914c3294d337cef`)
        SetDataYT([{ Id_YT: response.data.results[0].key }]);
        setLoading(false)
      }
      catch(error){
        console.log(error)
      }
    }
    GetDataYoutube()
  },[])
  
  
  useEffect(()=>{
    async function GetData() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=1d64987033e87e832914c3294d337cef`) 
     setImage(response.data.poster_path)
     const genres = response.data.genres
     genres.map((elem:any) => {
       getgenres(elem.name)
       
      })
      
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
  return (
    <>
    {Loading ? (
      <div className="bg-black h-screen shimmer"></div>
    ) : (
      <div className='bg-black h-screen'>
    <Navigation></Navigation>
    <div className='flex justify-center items-center h-screen'>
    <YouTube videoId={DataYT[0].Id_YT} opts={opts}  />
    </div>
    <div className='bg-black h-screen justify-center flex items-center p-6'>
      <div key={Data?.id} className='text-white flex justify-center items-start flex-col max-w-160 w-full '>
        <h1 className='text-start text-3xl font-bold'>{Data?.NameTitle}</h1>
        <h2 className='pb-4'>{Data?.data}</h2>
        <p>{Data?.description}</p>
      </div>
      <div className='flex justify-center items-center px-10'>
        <img className='w-72' src={imagePath} alt="" />
      </div>
    </div>
    </div>
    )}
    </>
  )
}

export default InfoMovies