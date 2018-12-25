import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {
  componentDidMount () {
    const initPath = window.location.pathname
    const links = document.querySelectorAll('.menu-itm')
    links.forEach((link, i) => {
      if (initPath === '/' && i === 0) link.classList.add('active')
      if (initPath === '/statistics' && i === 1) link.classList.add('active')
      if (initPath === '/plans' && i === 2) link.classList.add('active')
      if (initPath === '/settings' && i === 3) link.classList.add('active')
      link.addEventListener('click', (e) => {
        links.forEach((link) => {
          link.classList.remove('active')
        })
        e.target.classList.add('active')
      })
    })
  }
  render () {
    return (
      <div className='main-menu'>
        <Link to='/'><div className='menu-itm'><i className='fas fa-globe-americas' /> Overview</div></Link>
        <Link to='/statistics'><div className='menu-itm'><i className='fas fa-chart-bar' /> Statistic</div></Link>
        <Link to='/plans'><div className='menu-itm'><i className='fas fa-piggy-bank' /> Plans</div></Link>
        <Link to='/settings'><div className='menu-itm'><i className='fas fa-cogs' /> Setting</div></Link>
        <div className='menu-itm' onClick={() => {
          window.localStorage.removeItem('id')
          window.localStorage.removeItem('token')
          window.location.href = ''
        }}><i className='fas fa-sign-out-alt' /> Logout</div>
        <div className='v-des'>v0.1 Beta</div>
      </div>
    )
  }
}
export default Menu
