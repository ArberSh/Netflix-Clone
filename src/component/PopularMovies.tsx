import axios from 'axios';
import{ useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../Swiper-Edit.css'
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


interface Information {
    Id:number;
    Image:string;
    Title:string;
  }

function TopRatingMovies() {

    const [Data,SetData] = useState<Information[]>([])
    

    useEffect(()=>{
    
        async function fetchMovieData() {
          try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=1d64987033e87e832914c3294d337cef')
            const Test = response.data.results
                SetData(
                    Test.map((elem: any) => ({
                      Id:elem.id,
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
    
    <div className=''>
        <h1 className='text-white text-xl pb-4 font-bold'>Popular Movies</h1>
        <div className='flex flex-row justify-start items-center flex-wrap gap-4'>
        <Swiper
      slidesPerView={6}  
      slidesPerGroup={6} 
      navigation={true}  
      modules={[Navigation]}
      className="mySwiper"
      breakpoints={{
        110: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        750: {
          slidesPerView: 3,
          slidesPerGroup: 3
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4
        },
        1250:{
            slidesPerView: 6,
          slidesPerGroup: 6
        }
      }}
    >
         {Data.map((elem, index) => (
            <SwiperSlide key={index} className='flex justify-center items-center'>
              <Link to={`/InfoMovie/${elem.Id}`}>
            <div key={index} className='pt-2 cursor-pointer text-white flex flex-col text-center w-56 transition ease-in-out hover:scale-110 max-[640px]:w-40'>
                <img className='w-56 rounded-lg ' src={elem.Image} alt="" />
            <h1>{elem.Title}</h1>
            </div>
            </Link>
            </SwiperSlide>
      ))}
      </Swiper>
      </div>
      </div>
  )
}

export default TopRatingMovies