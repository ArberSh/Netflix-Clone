import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Information {
  idMovie:number;
  Title:string;
  Poster_path:string;
}

function Search() {

    const {name} = useParams()
    const [Data,SetData] = useState<Information[]>([])

    useEffect(()=>{
        async function GetData(){
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1d64987033e87e832914c3294d337cef&query=${name}&language=en-US&page=1&include_adult=false`)
        console.log(response.data.results[0].poster_path)
        const getdata = response.data.results

        const newdata = getdata.map((elem:any)=>({
          idMovie:elem.id,
          Title:elem.title,
          Poster_path:`https://image.tmdb.org/t/p/original${elem.poster_path}`
        }))
        SetData(newdata)
        console.log(Data[0].Poster_path)
      } 
    GetData()
    },[])
    

    console.log(name)
  return (
    <div className='bg-black h-screen'>
      <div className='flex justify-center items-center text-white flex-wrap'>
        {Data.map((elem:any)=>(
          <div key={elem.idMovie} className='flex justify-center items-center flex-col max-w-40 w-full'>
          <img className='w-40' src={elem.Poster_path} alt="" />
          <h1>{elem.Title}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search