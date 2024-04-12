import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import './Header.css'
import logo from '../Assets/ColorLogo.png'
import dropdown from '../Assets/Dropdown.png'

export const Header = () => {
  
  const [menu, setMenu] = useState('table')
  const [logoActive, setLogoActive] = useState(false)
  const [activeItem, setActiveItem] = useState(null);
  const menuRef = useRef()
  
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('header-menu-visible')
    e.target.classList.toggle('open')
  }
  let logoActivating = () => {
    logoActive=true
  }

  return (
   <header>
    <Link to='/' className='logo' onClick={logoActivating}>
    <img className='logo' src={logo} alt=''/>
    </Link>
      <img className='header_dropdown' onClick={dropdown_toggle} src={dropdown} alt='' />
    <ul ref={menuRef} className='header-menu'>
            <li onClick={() => {setMenu('table'); setActiveItem('table')}}>
              <Link style={{textDecoration: 'none', color: activeItem === 'table' ? '#419dff' : 'black'}} to='/'>Table</Link>
              {menu==='table'? <hr /> : <></>}
            </li>
            <li onClick={() => {setMenu('info'); setActiveItem('info')}}>
              <Link style={{textDecoration: 'none', color: activeItem === 'info' ? '#419dff' : 'black'}} to='/info'>Info</Link>
              {menu==='info'? <hr /> : <></>}
            </li>
    </ul>
  </header>
  )
}
