import React, { useEffect, useState } from 'react';
import { get } from '../utils/httpClient';
import requests from '../utils/Request';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function RandomMovie() {
    const [movies, setMovies] = useState([]); //almacena la lista de películas obtenidas de la API
    const [randomIndex, setRandomIndex] = useState(0); //estado mantiene el índice de la película aleatoria actual que se está mostrando.
    const [imageLoaded, setImageLoaded] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await get(requests.requestPopular);
                setMovies(data.results); //Actualiza el estado movies con los resultados.
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();

        // Cambiar película cada 10 segundos
        const intervalId = setInterval(() => {
            setRandomIndex(prevIndex => (prevIndex + 1) % movies.length); //actualiza el estado randomIndex con un nuevo índice aleatorio.
            setAnimationKey(prevKey => prevKey + 1);
        }, 7000);

        return () => clearInterval(intervalId); // Limpia el intervalo en el desmontaje
    }, [movies.length]);

    const movieRandom = movies[randomIndex];

    // función para establecer una longitud por defecto del overview
    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };
    // función para cambiar estado de la imagen cargada.
    const handleImageLoaded = () => {
        setImageLoaded(true);
    }

    const variants = {
        hidden: { opacity: 0, y: -50 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className='w-full h-[30.5rem] text-white '>
            <div className='h-full w-full'>
                <div className='absolute w-full h-[30.6rem] bg-gradient-to-t from-[#080F28]'></div>
                <img src={`https://image.tmdb.org/t/p/original/${movieRandom?.backdrop_path}`} alt={movieRandom?.title} onLoad={handleImageLoaded} className='w-full h-full object-cover' />
                { imageLoaded && (<div key={animationKey} className='absolute w-full top-[8%] lg:top-[10%] xl:top-[15%] px-5 pt-20 md:p-10 lg:p-20 text-left'>
                    <motion.h1
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        variants={variants}
                        className='text-4xl md:text-6xl font-bold'>
                        {movieRandom?.title}
                    </motion.h1>
                    <div className='my-4'>
                        <Link to={`/movie/${movieRandom?.id}`}>
                            <motion.button
                                initial='hidden'
                                whileInView='show'
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                variants={variants}
                                className=' bg-[#00AEFB] px-6 py-2 rounded cursor-pointer text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/90 hover:bg-[#0095D5]'>
                                Details
                            </motion.button>
                        </Link>
                    </div>
                    <motion.p
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{delay: 0.6, duration: 0.5 }}
                        variants={variants}
                        className='text-gray-400 text-md mb-2'>
                        Released: {movieRandom?.release_date}
                    </motion.p>
                    <motion.p
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{delay: 0.8, duration: 0.5 }}
                        variants={variants}
                        className='w-full md:max-w-[80%] text-xl text-gray-200'>{truncateString(movieRandom?.overview, 250)}</motion.p>
                </div>)}
            </div>
        </div>
    );
}
