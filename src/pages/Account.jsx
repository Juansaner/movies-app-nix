import React, { useState } from 'react'
import SavedShows from '../components/SavedShows'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import fondo from '/assets/footer-bg.jpg'

const Account = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  }

  const variants = {
    hidden: { opacity: 0, y: -50 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <>
      <div className='w-full text-white'>
        <img className=' w-full h-[15rem] md:h-[25rem] object-cover' onLoad={handleImageLoaded} src={fondo} alt="" />
        <div className='bg-gradient-to-t from-[#080F28] absolute top-0 left-0 w-full h-[15rem] md:h-[25rem]'></div>
        {imageLoaded && (<div className='absolute top-[15%] md:top-[12%] lg:top-[20%] p-4 md:p-8 left-1/2 transform -translate-x-1/2 items-center'>
          <motion.h1
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            variants={variants}
            className='text-5xl md:text-7xl lg:text-8xl font-bold'>My Favorites</motion.h1>
        </div>)}
      </div>
      <SavedShows />
      <Footer />
    </>
  )
}

export default Account
