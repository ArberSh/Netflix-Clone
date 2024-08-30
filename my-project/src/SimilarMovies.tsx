import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
                IdMovie: elem.id,
                NameTitle: elem.title,
                imagePath: `https://image.tmdb.org/t/p/original${elem.poster_path}`
           }
            ))
           SetData(newData)
            SetLoading(false)
    }
    catch(error){
        console.log(error)
    }
}
GetData()




},[])
console.log(Data)

  return (
    <>
    {Loading ?  <div>hi</div> : 
    <div  className='  px-1/2'>
        <div className='text-white flex flex-row justify-center items-center flex-wrap'>
           <Swiper
      slidesPerView={4}  
      slidesPerGroup={4} 
      navigation={true}  
      modules={[Navigation]}
      className="mySwiper flex justify-center items-center px-12"
      breakpoints={{
        410: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        750: {
          slidesPerView: 3,
          slidesPerGroup: 3
        },
        1080:{
            slidesPerView:4,
            slidesPerGroup:4
        }
      }}
    >
        {Data.map((elem,index)=>(
            <SwiperSlide className=''>
            <div className='w-40 flex flex-col items-center justify-center' key={index}>
                <img className='w-40' src={elem.imagePath} alt="" />
                <h1> {elem.NameTitle} </h1>
                
                </div>
                </SwiperSlide>
        ))

        }
        </Swiper>
        </div>
        </div> }
   
        </>
  )
}

export default SimilarMovies