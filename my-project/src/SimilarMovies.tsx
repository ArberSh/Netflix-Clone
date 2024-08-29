import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

interface Information{
    IdMovie:number,
    NameTitle:string
    imagePath:string
}

function SimilarMovies() {

    const { id } = useParams()
    const [Image,setImage] = useState()
    const [Data,SetData] = useState<Information[]>([])
    const [Loading,SetLoading] = useState(true)


    useEffect(()=>{
        async function GetData() {
          try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1&api_key=1d64987033e87e832914c3294d337cef`) 
            const Data = response.data.results
            
           const newData = Data.map((elem:any)=>({
              SetData({
                IdMovie: elem.id,
                NameTitle: elem.original_title,
                imagePath: elem.poster_path
           }
           )}  
            ))
           
            SetLoading(true)
    }
    catch(error){
        console.log(error)
    }
}
console.log(Data)
GetData()


},[])

  return (
    <>
    {Loading ?  <div>hi</div> : <div  className='text-white'>
        {Data.map((elem,index)=>(
            <div key={index}>{elem.NameTitle}</div>
        ))

        }
        </div> }
   
        </>
  )
}

export default SimilarMovies