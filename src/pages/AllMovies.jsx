import React, { useEffect, useState } from 'react'
import requests from '../utils/Request'
import Navbar from '../components/Navbar'
import { useQuery } from "../hooks/useQuery";
import { get } from "../utils/httpClient";
import Spinner from '../components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import MoviesCard from '../components/MoviesCard';
import Search from '../components/Search';
import { Toast } from '../utils/Toast'
import { motion } from 'framer-motion'

const AllMovies = ({ title }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false); 

    const query = useQuery();
    const search = query.get("search");
    //Carga de películas
    useEffect(() => {
        setIsLoading(true);
        //Si hay una búsqueda, modifica la url. En caso contrario utliza la URL establecida en requests
        const searchUrl = search ? `/search/movie?query=${search}&page=${page}`
            : `${requests.requestMovies}?page=${page}`;
            get(searchUrl).then((data) => {
                // Filtrar películas duplicadas
                const uniqueMovies = data.results.filter((newMovie) => !movies.find((existingMovie) => existingMovie.id === newMovie.id));
        
                setMovies((prevMovies) => [...prevMovies, ...uniqueMovies]);
                setHasMore(data.page < data.total_pages);
                setIsLoading(false);
            });
    }, [search, page]);

    // Verificar la presencia de películas después de que se hayan cargado
    useEffect(() => {
        //Si isLoading es false (es decir, la carga ha finalizado) y movies está vacío, se muestra el mensaje.
        if (!isLoading && movies.length === 0) {
            Toast.fire({
                icon: 'error',
                title: 'Ops... Movie not found'
            });
        }
    }, [isLoading, movies]);

    const variants = {
        hidden: { opacity: 0, y: -50 },
        show: { opacity: 1, y: 0 }
    }

    const handleImageLoaded = () => {
        setImageLoaded(true)
    }

    return (
        <>
            <Navbar />
            <div className='w-full text-white'>
                <img className=' w-full h-[17rem] sm:h-[25rem] object-cover' onLoad={handleImageLoaded} src="./src/assets/footer-bg.jpg" alt="Imagen fondo" />
                <div className='bg-gradient-to-t from-[#080F28] absolute top-0 left-0 w-full h-[17rem] sm:h-[25rem]'></div>
                    {imageLoaded && (<div className='absolute top-[13%] md:top-[10%] lg:top-[20%] p-4 md:p-8 left-1/2 transform -translate-x-1/2 items-center'>
                        <motion.h1
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        variants={variants} 
                        className='text-5xl md:text-8xl font-bold mx-5 md:mx-10 lg:mx-20'>
                            All Movies
                            </motion.h1>
                    </div>)}
                <Search />
                <InfiniteScroll
                    dataLength={movies.length}
                    hasMore={hasMore}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    loader={<Spinner />}
                    style={{ overflow: 'hidden' }}>
                    <div>
                        <h2 className='text-white font-bold  md:text-4xl p-4 text-left mx-20'>{title}</h2>
                        <ul className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 mx-5 md:mx-10 lg:mx-20 my-10'>
                            {movies.map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
                        </ul>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

export default AllMovies
