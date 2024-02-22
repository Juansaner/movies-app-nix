import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Toast } from '../utils/Toast'

const Login = () => {

  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { user, logIn } = UserAuth()
  const navigate = useNavigate()

  //Función asincrónica
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; //Validacion de email 

    try {
      //Validaciones de formulario
      if (email == '' || !validRegex.test(email)) {
        Toast.fire({
          icon: 'error',
          title: 'Please enter a valid email address'
        })
        return false
      }

      if (password == '') {
        Toast.fire({
          icon: 'error',
          title: 'Please enter a password'
        })
        return false
      }
      // Maneja la autenticación con las credenciales proporcionadas
      await logIn(email, password)

      Toast.fire({
        icon: 'success',
        title: 'Logged in successfully!',
        didClose: () => {
          // Redirige después de que se cierre la notificación
          navigate('/');
        },
      })

    } catch (error) {

      if (error.code === 'auth/invalid-credential') {
        Toast.fire({
          icon: 'error',
          title: 'Invalid credentials'
        })
        return false
      }
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex items-center py-4 px-20 z-[100] w-full fixed top-0 left-0 right-0 '>
        <div className='w-[6rem] md:w-[5rem] md:ml-0 mx-auto my-12 md:my-0'>
          <Link to='/'>
            <img src='/src/assets/Logo.png' alt="Logo Nix" />
          </Link>
        </div>
      </div>
      <div className='flex justify-center items-center w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-screen object-cover' src="./src/assets/footer-bg.jpg" alt="" />
        <div className='bg-[#080F28]/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[450px] h-[460px] mx-auto bg-[#080F28]/75 rounded-md'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold text-white text-left'>
                Sign In
              </h1>
              <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-white/95 border-2 rounded-lg border-gray-700 border-opacity-50 outline-none focus:border-[#00AEFB] focus:text-black transition duration-200' type="email" placeholder='Email' autoComplete='email' />
                <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-white/95 border-2 rounded-lg border-gray-700 border-opacity-50 outline-none focus:border-[#00AEFB] focus:text-black transition duration-200' type='password' placeholder='Password' autoComplete='current-password' />
                <button className='bg-[#00AEFB] px-6 py-2 rounded cursor-pointer text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/90 hover:bg-[#0095D5]'>Sign In</button>
                <div className='flex justify-between items-center text-white/95'>
                  <p><input className='mr-2' type="checkbox" />Remember me</p>
                  <p>Need Help?</p>
                </div>
                <p className='py-4'><span className='text-white/95'>New to Nix?</span>{' '}
                  <Link to='/signup' className='text-[#00AEFB]'>
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
