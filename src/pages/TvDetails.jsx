import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { get } from '../utils/httpClient'
import Spinner from '../components/Spinner'
import { getMovieImg } from '../utils/getMovieImg'
import Navbar from '../components/Navbar'

export function TvDetails() {
  {/* acceder a los parámetros de la URL  */ }
  const { movieId } = useParams()
  {/* Cuando esté cargando la película se muestra loading*/ }
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState([])

  {/* realizar la solicitud a la API cuando el componente se monta o cuando el movieId cambia. */ }
  useEffect(() => {
    setIsLoading(true);
    get(`/tv/${movieId}`).then((data) => {
      setMovie(data);
      setIsLoading(false); {/* Cuando ya cargo la película el estado es false*/ }
    });
  }, [movieId]);

  if (isLoading) {
    return <Spinner />
  }

  const imageUrl = getMovieImg(movie.poster_path, 500)

  return (
    <>
      <Navbar />
      <div className='w-full h-[70vh] text-white '>
        <div className='h-full w-full'>
          <div className='absolute w-full h-[40vh] lg:h-[90vh] bg-gradient-to-t from-[#080F28]'></div>
          <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.name} className='w-full h-[40vh] lg:h-[90vh] object-cover' />
          <div className='flex justify-center gap-7 absolute w-full px-5 md:px-20 top-[30%]'>
            <div>
              <img className='hidden md:flex rounded-md w-[15.6rem] object-contain' src={imageUrl} alt={movie.name} />
            </div>
            <div className='md:max-w-[23rem] lg:max-w-[45rem] text-left'>
              <p className='text-[3rem] lg:text-[4rem] mb-[1rem] font-bold leading-tight'>{movie.name}</p>
              <div className='flex flex-wrap gap-4'>{movie.genres && movie.genres.map(genre =>
                <div key={genre.id} className="bg-[#101F3C] border-[#0079fc] border-2 rounded-full py-[0.2rem] px-[0.6rem] md:py-[0.5rem] md:px-[1.5rem] mb-[1rem] font-semibold">
                  <p>{genre.name}</p>
                </div>
              )}</div>
              <p className='text-xl'> {movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
