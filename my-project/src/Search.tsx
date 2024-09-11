import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from './component/Navigation';

interface Information {
  idMovie: number;
  Title: string;
  Poster_path: string;
}

// Forbidden keywords that may hint at nudity or inappropriate content
const forbiddenKeywords: string[] = ['nudity', 'erotic', 'sexual', 'explicit', 'nude', 'adult'];
// Excluded genres that might often contain nudity (e.g., Romance, Drama)
const excludedGenres: number[] = [10749, 18]; // Romance and Drama as examples

function Search() {
  const { name } = useParams<{ name: string }>();
  const [Data, SetData] = useState<Information[]>([]);

  useEffect(() => {
    async function GetData() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=1d64987033e87e832914c3294d337cef&query=${name}&language=en-US&page=1&include_adult=false`
        );

        const getdata = response.data.results;

        // Filter movies based on forbidden keywords in title or overview and excluded genres
        const filteredData = getdata.filter((movie: any) => {
          // Check if the overview or title contains forbidden keywords
          const hasForbiddenKeyword = forbiddenKeywords.some((keyword) =>
            (movie.overview || '').toLowerCase().includes(keyword) || (movie.title || '').toLowerCase().includes(keyword)
          );

          // Check if any of the movie's genres match the excluded genres
          const hasExcludedGenre = movie.genre_ids?.some((genreId: number) => excludedGenres.includes(genreId));

          // Only include movies that do not have forbidden keywords or excluded genres
          return !hasForbiddenKeyword && !hasExcludedGenre;
        });

        // Map the filtered results to the structure your app needs
        const newdata = filteredData.map((elem: any) => ({
          idMovie: elem.id,
          Title: elem.title,
          Poster_path: elem.poster_path
            ? `https://image.tmdb.org/t/p/original${elem.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image', // Fallback image if there's no poster
        }));

        SetData(newdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (name) {
      GetData();
    }
  }, [name]); // Dependency on 'name' ensures this runs when the search term changes

  return (
    <div className='bg-black h-full p-4'>
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
        )}
      </div>
    </div>
  );
}

export default Search;
