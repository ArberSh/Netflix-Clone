import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function InfoMovies() {

  const { id } = useParams();
  const [Data,SetData] = useState('')

  useEffect(() => {
    async function fetchPosts(id: number | undefined) {
      try {
        const { data } = await axios.get(`https://perenual.com/api/species/details/${id}?key=sk-qcAS65a265f29c4111704`);
        SetData(data);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchPosts(id);
  }, [id]);

  return (
    <div className='bg-black h-screen'>

    </div>
  )
}

export default InfoMovies