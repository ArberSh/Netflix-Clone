import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from './component/Navigation'

interface Information {
  idMovie:number;
  Title:string;
  Poster_path:string;
}

const forbiddenKeywords: string[] = ['nudity', 'erotic', 'sexual']; 
const excludedGenres: number[] = [10749, 18];

function Search() {

    
    const {name} = useParams()
    const [Data,SetData] = useState<Information[]>([])

    useEffect(()=>{
        async function GetData(){
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1d64987033e87e832914c3294d337cef&query=${name}&language=en-US&page=1&include_adult=false`)
        
        console.log(response.data.results)
        const getdata = response.data.results
        const filteredData = getdata.filter((movie: any) => {
          // Check for forbidden keywords in the overview or title
          const hasForbiddenKeyword = forbiddenKeywords.some(keyword =>
            movie.overview.toLowerCase().includes(keyword) || movie.title.toLowerCase().includes(keyword)
          );

          // Check for excluded genres
          const hasExcludedGenre = movie.genre_ids.some((genreId: number) => excludedGenres.includes(genreId));

          // Only include movies that do not have forbidden content
          return !hasForbiddenKeyword && !hasExcludedGenre;
        });

        // Map filtered results to the desired structure
        const newdata = filteredData.map((elem: any) => ({
          idMovie: elem.id,
          Title: elem.title,
          Poster_path: elem.poster_path
            ? `https://image.tmdb.org/t/p/original${elem.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image', // Fallback image
          Overview: elem.overview,
          Genre_ids: elem.genre_ids
        }));


        SetData(newdata)
        console.log(Data[0].Poster_path)
      } 
    GetData()
    },[])
    

    console.log(name)
  return (
    <div className='bg-black h-full p-4'>
      <Navigation></Navigation>
      <div className='flex justify-center items-center flex-wrap pt-16'>
{Data.map((elem:any)=>(
          <div key={elem.idMovie} className=' flex justify-center items-center flex-col max-w-72 w-full m-4'>
          <img className='max-w-72 w-full' src={elem.Poster_path} alt="" />
          <h1>{elem.Title}</h1>
          </div>
        ))}
        </div>
        </div>
  )
}

export default Search