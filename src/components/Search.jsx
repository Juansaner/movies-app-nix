import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import {useSearchParams } from 'react-router-dom'

export default function Search() {

    const [query, setQuery] = useSearchParams()
    const search = query.get('search') //Trae el parámetro de búsqueda 
    
    /*Este evento cancela lo que hace por defecto los formularios */ 
    const handleSubmit = (e) => {
        e.preventDefault(); 
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className='flex justify-center'>
                <input type='text' className='text-[#8DA0BC] w-64 bg-[#101F3C] relative pl-4 pr-11 py-2 border-2 border-[#0079fc] rounded-full hover:border-white transition-all duration-300 '
                    value={search ?? ''}
                    placeholder='Title...'
                    aria-label='Search movies'
                    onChange={(e) => {
                        const value = e.target.value
                        setQuery({search: value}) /*Agrega la búsqueda del input a la ruta */
                    }} /> 
                    <FaSearch size={20} className='text-[#0079fc] absolute ml-[200px] mr-3 mt-3' />
            </div>
        </form>
    )
}
