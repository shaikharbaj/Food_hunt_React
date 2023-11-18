import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './cart.css'
const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-light emptycart">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 box">
                    <h1>Your Cart Is Empty....!🤷‍♂️</h1>
                    <button onClick={()=>navigate("/")}>Order Food Now👈</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EmptyCart