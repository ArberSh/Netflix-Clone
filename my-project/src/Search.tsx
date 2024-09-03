import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Search() {

    const {name} = useParams()

    useEffect(()=>{
        async function GetData(){
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1d64987033e87e832914c3294d337cef&query=${name}&language=en-US&page=1&include_adult=false`)
        console.log(response.data.results)
    } 
    GetData()
    },[])
    

    console.log(name)
  return (
    <div className='bg-black h-screen'>Search</div>
  )
}

export default Search