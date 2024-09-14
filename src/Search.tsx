import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './component/Navigation';

interface Information {
  idMovie: number;
  Title: string;
  Poster_path: string;
}

const forbiddenKeywords: string[] = ['nudity', 'erotic', 'sexual', 'explicit', 'nude', 'adult'];
const excludedGenres: number[] = [10749, 18]; 

function Search() {
  const { name } = useParams<{ name: string }>();
  const [Data, SetData] = useState<Information[]>([]);
  const [Loading,SetLoading] = useState<boolean>(true)

  useEffect(() => {
    async function GetData() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=1d64987033e87e832914c3294d337cef&certification_country=US&certification.lte=PG-13&include_adult=false&with_genres=16,10751&without_genres=18,10749&sort_by=popularity.desc`
        );

        const getdata = response.data.results;

        const filteredData = getdata.filter((movie: any) => {
          const hasForbiddenKeyword = forbiddenKeywords.some((keyword) =>
            (movie.overview || '').toLowerCase().includes(keyword) || (movie.title || '').toLowerCase().includes(keyword)
          );

          const hasExcludedGenre = movie.genre_ids?.some((genreId: number) => excludedGenres.includes(genreId));

          return !hasForbiddenKeyword && !hasExcludedGenre;
        });

        const newdata = filteredData.map((elem: any) => ({
          idMovie: elem.id,
          Title: elem.title,
          Poster_path: elem.poster_path
            ? `https://image.tmdb.org/t/p/original${elem.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image', // Fallback image if there's no poster
        }));
        setTimeout(()=>{
          SetLoading(false)
        },300)
        SetData(newdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (name) {
      GetData();
    }
  }, [name]);

  return (
    <div className='bg-black h-full '>
    {Loading ? <div className='bg-black h-screen shimmer'> 
      </div> 
      : <div className='p-4'>
      <Navigation />
      <div className='flex justify-center items-center flex-wrap pt-16'>
        {Data.length > 0 ? (
          Data.map((elem: any) => (
            <div key={elem.idMovie}>
              <Link to={`/InfoMovie/${elem.idMovie}`}>
                <div className='flex justify-center items-center flex-col max-w-72 w-full m-4'>
                  <img className='max-w-72 w-full' src={elem.Poster_path} alt={elem.Title} />
                  <h1 className='text-white'>{elem.Title}</h1>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className='text-white'>No results found for "{name}".</p>
        )}</div>
      </div>
    }
    
    </div>
  );
}

export default Search;
