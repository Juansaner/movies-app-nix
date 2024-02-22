import React, { useEffect, useState } from 'react'
import MoviesCard from './MoviesCard'
import { get } from '../utils/httpClient'

const MoviesGrid = ({ title, fetchURL }) => {

  const [movies, setMovies] = useState([])
  
  useEffect(() => {
    {/*Llamando a la funcion get para hacer la solicitud a la API */ }
    get(fetchURL).then((data) => {
      setMovies(data.results)
    })
  }, [])

  return (
    <div>
      <div className='my-[5rem] lg:mt-12'>
        <h2 className='text-white font-bold text-2xl md:text-4xl py-4 text-left mx-5 md:mx-10 lg:mx-20'>{title}</h2>
          <div className='h-1 w-[3rem] bg-[#00AEFB] mx-5 md:mx-10 lg:mx-20'></div>
          <ul className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mx-5 md:mx-10 lg:mx-20 my-10'>
            {movies.map((movie) => <MoviesCard key={movie.id} movie={movie}/>)}
          </ul>
      </div>
    </div>
  )
}

export default MoviesGrid
