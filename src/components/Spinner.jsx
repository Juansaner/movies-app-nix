import React from 'react'
import { ImSpinner2 } from "react-icons/im";


function Spinner() {
  return (
    <div className='flex justify-center text-[#00AEFB] animate-spin mx-[190px]'>
      <ImSpinner2  size={60} />
    </div>
  )
}

export default Spinner
