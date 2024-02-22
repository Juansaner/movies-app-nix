import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import Navbar from './Navbar'
import { AiOutlineClose } from 'react-icons/ai'


const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      const data = doc.data();
      // Verifica si 'savedShows' está definido antes de intentar acceder a 'map'
      const savedShows = data?.savedShows || [];
      setMovies(savedShows);
    });
  }, [user?.email]);
  
  //función para eliminar un elemento específico de la lista savedShows
  const movieRef = doc(db, 'users', `${user?.email}`); // referencia al documento del usuario en Firestore
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((movie) => movie.id !== passedID) //crea un nuevo array (result) que excluye la película con el ID proporcionado (passedID)
      //Actualiza el documento del usuario en Firebase
      await updateDoc(movieRef, {
        savedShows: result, // savedShows contiene el nuevo array
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Navbar />
      <div className="mt-10 mb-[5rem]">
        <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl py-4 text-left mx-5 md:mx-10 lg:mx-20">My shows</h2>
        <div className='h-1 w-[3rem] bg-[#00AEFB] mx-5 md:mx-10 lg:mx-20'></div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 mx-5 md:mx-10 lg:mx-20 my-10">
          {movies.map((movie) => (
            <li key={movie.id} className="relative group cursor-pointer">
              <Link to={`/movie/${movie.id}`}>
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie?.img}`}
                    alt={movie.title}
                    className="rounded-md"
                  />
                  <div className="bg-[#080F28] absolute inset-0 rounded-md opacity-0 group-hover:opacity-70 transition duration-300"></div>
                  <FaPlay className="text-white bg-[#00AEFB] w-20 py-4 rounded-full text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/90" />
                </div>
                <div className="bottom-0 left-0 w-full p-2 text-white group-hover:text-[#0079fc] transition duration-300">
                  <p className="text-xl">{movie.title}</p>
                </div>
              </Link>
              <button onClick={() => deleteShow(movie.id)} className='text-white absolute top-3 right-3'><AiOutlineClose /></button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SavedShows
