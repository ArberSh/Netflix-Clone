import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Information{
    IdMovie:number,
    NameTitle:string
    imagePath:string
}

function SimilarMovies() {

    const [Data,SetData] = useState<Information[]>([])
    const [Loading,SetLoading] = useState(true)

    


    useEffect(()=>{
        async function GetData() {
          try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=1d64987033e87e832914c3294d337cef&certification_country=US&certification.lte=PG-13&include_adult=false&with_genres=16,10751&without_genres=18,10749&sort_by=popularity.desc`) 
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
        SetLoading(false)
    }
}
GetData()


},[])

function refreshPage(){
    window.location.reload();
} 

console.log(Data)

  return (
    <>
    {Loading ?  <div>hi</div> : 
    <div className='py-6  px-1/2 bg-black'>
        <div className='text-white flex flex-row justify-center items-center flex-wrap px-56 max-[1080px]:px-32 max-[710px]:px-12 '>
        <div className='flex justify-start items-start w-full pb-6'>
        <h1 className='text-white text-xl font-bold px-10 '>Similar Movies</h1>
        </div>
           <Swiper
      slidesPerView={4}  
      slidesPerGroup={4} 
      navigation={true}  
      modules={[Navigation]}
      className="mySwiper flex justify-center items-center px-12"
      breakpoints={{
        110: {
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
                <button onClick={refreshPage}>
                <Link to={`/InfoMovie/${elem.IdMovie}`}>
            <div className='w-full max-w-40 flex flex-col items-center justify-center' key={index}>
                <img className='w-full max-w-40' src={elem.imagePath} alt="" />
                <h1> {elem.NameTitle} </h1>
                
                </div>
                </Link>
                </button>
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