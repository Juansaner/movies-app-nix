import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { getMovieImg } from '../utils/getMovieImg'
import { FaPlay } from "react-icons/fa";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Toast } from '../utils/Toast'

//Función para validar si existe determinada propiedad dentro del objeto de la película o serie
export const determineContentType = (movie) => {
  // Verificar si la propiedad "release_date" está presente para determinar si es una película
  const isMovie = !!movie.release_date;
  // Verificar si la propiedad "first_air_date" está presente para determinar si es una serie de televisión
  const isTVShow = !!movie.first_air_date;

  if (isMovie) {
    return '/movie/' + movie.id; // Devuelve la URL para películas
  } else if (isTVShow) {
    return '/tv/' + movie.id; // Devuelve la URL para series de televisión
  } else {
    return '/error'; // En caso de que no se pueda determinar el tipo de contenido
  }
};

const MoviesCard = ({ movie }) => {

  const contentTypeUrl = determineContentType(movie);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const titleOrName = movie.title || movie.name; // Acepta los titulos de las películas y los nombres de las series
  const imageUrl = getMovieImg(movie.poster_path, 300); {/* Ruta y ancho de la imagen */ }
  const movieID = doc(db, 'users', `${user?.email}`); //Se crea una referencia al documento de usuario en Firestore utilizando la dirección de correo electrónico del usuario actua

  const saveShow = async (e) => {
    e.stopPropagation(); // Evita la propagación del evento hacia arriba
    if (user?.email) {
      // Si el usuario está autenticado
      setLike(!like);
      setSaved(true);
      // Actualiza el documento del usuario en Firestore para agregar la nueva película a la lista de películas guardadas
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          img: movie.backdrop_path,
        })
      })
    } else {
      Toast.fire({
        icon: 'info',
        title: 'Please log in to save a movie'
      })
    }
  }
  
  return (
    <li className="relative group cursor-pointer">
      <button className="absolute top-4 left-4 z-10" onClick={saveShow}>
        {like ? (
          <FaHeart className=' text-white' />
        ) : (
          <FaRegHeart className=' text-white' />
        )}
      </button>
      <Link to={contentTypeUrl}>
        <div className="relative">
          <img src={imageUrl} alt={titleOrName} className="rounded-md" />
          <div className="bg-[#080F28] absolute inset-0 rounded-md opacity-0 group-hover:opacity-70 transition duration-300"></div>
          <FaPlay className="text-white bg-[#00AEFB] w-20 py-4 rounded-full text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/90" />
        </div>
        <div className="bottom-0 left-0 w-full p-2 text-white group-hover:text-[#0079fc] transition duration-300">
          <p className="text-xl">{titleOrName}</p>
        </div>
      </Link>
    </li>
  )
}

export default MoviesCard
