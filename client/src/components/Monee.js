import React from 'react'
import '../App.css'
import App from './App'
import LoginMain from './Login/LoginMain'
const Monee = () => {
  const isLoggedIn = window.localStorage.getItem('token') !== null
  return (
    isLoggedIn ? <App /> : <LoginMain />
  )
}
export default Monee
