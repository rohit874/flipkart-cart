import React from 'react'
import { NavLink } from 'react-router-dom'

function Header({cart}) {
    return (
        <div className="header">
            <NavLink to="/"><h2>Flipkart</h2></NavLink>
            <NavLink to="/cart"><h4>Cart <span>{Object.keys(cart).length>0 ? "("+Object.keys(cart).length+")":null }</span></h4></NavLink>
        </div>
    )
}

export default Header
