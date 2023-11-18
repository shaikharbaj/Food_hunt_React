import React, { useRef, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { cartItemSelector } from '../../store/slices/cartSlice'
import useOnline from '../../Hooks/useOnline'
import { logout, userSelector } from '../../store/slices/userAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
const Header = () => {
  const cartItem = cartItemSelector();
  const dispatch=useDispatch();
  const loggedUser = useSelector((state)=>state.user.loggedUser);
 
  const online = useOnline();

  const close = useRef();
  
  const CloseNavBar=()=>{
      close.current.classList.remove("show");
  }
  const LogOut=(e)=>{
        e.preventDefault();
        dispatch(logout());
  }
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="brand">
          <span className='logo'>🍔</span>
          <a className="navbar-brand" href="#">FoodHunt <span className='online_status'>{online?<i class='bx bx-radio-circle active'></i>:<i class='bx bx-radio-circle deactive'></i>}</span></a>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <i className='bx bx-menu'></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown" ref={close} onClick={CloseNavBar}>
          <ul className="navbar-nav ms-auto">
            {
                loggedUser && <li className="nav-item">
                <Link className="nav-link user_link" onClick={(e)=>e.preventDefault()}><i class='bx bxs-user-check'></i>{loggedUser?.name}</Link>
              </li>
            }
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">Contact</Link>
            </li>

            <li className="nav-item">
              <Link to={"/cart"} className="nav-link">
                <span className='cart_link'> <i className='bx bx-shopping-bag'></i>Cart
                <span className='cart_item_number'>{cartItem.length}</span>
                </span>
                </Link>
            </li>
           {
               loggedUser ?<li className="nav-item">
               <Link onClick={LogOut} className="nav-link">Logout</Link>
             </li> :<><li className="nav-item">
               <Link to={"/login"} className="nav-link">Login</Link>
             </li>
 
             <li className="nav-item">
               <Link to={"/register"} className="nav-link">Register</Link>
             </li></>
           }
           
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header