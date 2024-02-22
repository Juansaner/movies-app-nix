import React, { useState } from 'react'
import { Toast } from '../utils/Toast'
import {
  Link, NavLink, useNavigate
} from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { RiMenu3Fill, RiCloseFill, RiUserLine, RiLogoutBoxRLine, RiHome3Line, RiMovieLine, RiComputerLine } from "react-icons/ri";

export default function Navbar() {
  const { user, logOut } = UserAuth()
  const navigate = useNavigate()
  const [color, setColor] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const normalLink = 'py-2 mx-4 text-xl text-white relative transition-colors duration-300 before:absolute before:left-0 before:-bottom-0 before:w-0 before:h-1 before:bg-[#00AEFB] before:rounded-full before:transition-all before:duration-300 font-bold hover:text-[#00AEFB] hover:before:w-full'
  const activeLink = 'py-2 mx-4 text-xl text-white relative transition-colors duration-300 before:absolute before:left-0 before:-bottom-0 before:w-full before:h-1 before:bg-[#00AEFB] before:rounded-full before:transition-all before:duration-300 font-bold hover:text-[#00AEFB]'

  const mobileNormalLink = "py-4 my-1 text-xl text-white font-bold flex justify-center items-center"
  const mobileActiveLink = "py-4 my-1 text-xl text-[#00AEFB] font-bold flex justify-center items-center"
  // cambiar el color del nav al hacer scroll
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true)
    } else {
      setColor(false)
    }
  }
  window.addEventListener('scroll', changeColor)

  const handleLogout = async () => {
    try {
      await logOut()
      Toast.fire({
        icon: 'success',
        title: 'Session successfully closed!',
        didClose: () => {
          // Redirige después de que se cierre la notificación
          navigate('/');
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <nav className={`py-4 z-[100] px-5 md:px-10 lg:px-20 fixed top-0 left-0 right-0 transition-all duration-300 ${color ? 'h-20 bg-[#080F28]' : 'h-32 bg-transparent'}`}>
        {/*Menu mobile */}
        <div className={`fixed top-0 pt-12 bg-[#080F28] w-[70%] h-full z-50 transition-all duration-300 ${showMenu ? "right-0" : "-right-full"}`}>
          <button onClick={() => setShowMenu(!showMenu)} className='text-3xl text-white p-4 absolute top-0 right-0'>
            <RiCloseFill />
          </button>
          {user?.email ?
            <div className='flex flex-col'>
              <NavLink to='/account' className={({ isActive }) => (isActive ? mobileActiveLink : mobileNormalLink)}>
                <div className='flex items-center w-[7rem] gap-2'>
                  <RiUserLine /> Account
                </div>
              </NavLink>
              <button onClick={handleLogout} className='p-4 text-xl font-bold text-white flex justify-center items-center gap-2'>
                <div className='flex items-center w-[7rem] gap-2'>
                  <RiLogoutBoxRLine /> Logout
                </div>
              </button>
              <div className='bg-[#00AEFB] w-full h-[0.1rem]'></div>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? mobileActiveLink : mobileNormalLink)}>
                <div className='flex items-center w-[7rem] gap-2'>
                  <RiHome3Line /> Home
                </div>
              </NavLink>
              <NavLink to='/allmovie' className={({ isActive }) => (isActive ? mobileActiveLink : mobileNormalLink)}>
                <div className='flex items-center w-[7rem] gap-2'>
                  <RiMovieLine /> Movies
                </div>
              </NavLink>
              <NavLink to='/allseries' className={({ isActive }) => (isActive ? mobileActiveLink : mobileNormalLink)}>
                <div className='flex items-center w-[7rem] gap-2'>
                  <RiComputerLine /> Series
                </div>
              </NavLink>
            </div> :
            <div className='flex flex-col'>
              <NavLink to='/login' className={({ isActive }) => (isActive ? mobileActiveLink : mobileNormalLink)}>
                Sign In
              </NavLink>
              <Link to='/signup'>
                <button className='text-white font-bold py-4 my-1 text-xl'>
                  Sign Up
                </button>
              </Link>
            </div>}
        </div>
        {/* -- --- */}
        <div className='flex w-full justify-between'>
          <div className='w-[4rem]'>
            <Link to='/'>
              <img src='/src/assets/Logo.png' alt="Logo Nix" />
            </Link>
          </div>
          {/* Btn hamburguesa */}
          <div className='text-white text-3xl flex md:hidden'>
            <button onClick={() => setShowMenu(!showMenu)}>
              <RiMenu3Fill />
            </button>
          </div>
          {/* Menú de navegación */}
          <div className='md:flex hidden'>
            {user?.email ?
              <div className='flex'>
                <NavLink
                  to='/'
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  Home
                </NavLink>
                <NavLink to='/allmovie' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  Movies
                </NavLink>
                <NavLink to='/allseries' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  Series
                </NavLink>
                {/* Línea vertical */}
                <div className="h-11 w-[4px] rounded-ful mx-2 bg-[#00AEFB]"></div>
                <NavLink to='/account' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  Account
                </NavLink>
                <button onClick={handleLogout} className=' bg-[#00AEFB] px-6 py-2 rounded cursor-pointer text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/90 hover:bg-[#0095D5]'>
                  Logout
                </button>
              </div> :
              <div>
                <NavLink to='/login' className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                  Sign In
                </NavLink>
                <Link to='/signup'>
                  <button className=' bg-[#00AEFB] px-6 py-2 rounded cursor-pointer text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/90 hover:bg-[#0095D5]'>
                    Sign Up
                  </button>
                </Link>
              </div>}
          </div>
        </div>
      </nav>
    </>
  )
}
