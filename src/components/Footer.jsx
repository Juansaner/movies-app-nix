import React from 'react'
import { Link } from 'react-router-dom';
import fondo from '/assets/footer-bg.jpg'
import logo from '/assets/logo.png'

const Footer = () => {
    return (
        <>
            <footer className='w-full text-white relative py-6 px-4'>
                <img className='w-full h-[30rem] md:h-[16rem] object-cover absolute top-0 left-0 z-0' src={fondo} alt="Background" />
                <section className='relative z-10'>
                    <section className='flex justify-center'>
                        <figure className='w-[4rem]'>
                            <Link>
                                <img src={logo} alt="Logo Nix" />
                            </Link>
                        </figure>
                    </section>
                    <div className='grid md:grid-cols-3 text-xl mt-4 md:mt-7 space-y-3 font-semibold'>
                        <nav className='flex flex-col space-y-4 items-center '>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Home</Link>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Contact us</Link>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Term of services</Link>
                        </nav>
                        <nav className='flex flex-col space-y-4 items-center'>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Live</Link>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>FAQ</Link>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Premium</Link>
                        </nav>
                        <nav className='flex flex-col space-y-4 items-center'>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>You must watch</Link>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Recent release</Link>
                            <Link to="/" className='hover:text-[#00AEFB] transition-colors duration-300'>Top IMDB</Link>
                        </nav>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer
