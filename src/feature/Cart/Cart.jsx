import React, { useEffect, useState,useRef } from 'react'
import { IMG_CDN_URL } from '../../constant';
import imagenotfound from '../../assets/no-image.png'
import './cart.css'
import { Link, useNavigate } from 'react-router-dom'
import EmptyCart from './EmptyCart';
import { cartItemSelector, decrementQuantity, incrementQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
// import {ToastContainer,toast}from 'react-toastify'
import toast, { Toaster } from 'react-hot-toast';
const Cart = () => {
  const cartItem = cartItemSelector();
  const navigate = useNavigate();
  const loggedUser = useSelector((state)=>state?.user?.loggedUser);
  const [Total, setTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [discount,setDiscount]=useState(0);
  const [GTotal,setGTotal] = useState(0);
  const toastId = useRef(null);

  const dispatch = useDispatch();
  const INCREMENTQUANTITY = (item) => {
    dispatch(incrementQuantity(item));
  }

  const DECREMENTQUANTITY = (item) => {
    dispatch(decrementQuantity(item));
  }
  const GetGrandTotal = () => {
    let calculation = cartItem.reduce((acc, curr) => {
      acc.total += Number((curr.item.card.info.price? curr.item.card.info.price/ 100:curr.item.card.info.defaultPrice/ 100)) * Number(curr.quantity);

      acc.totalQuantity += curr.quantity
      return acc;
    }, { total: 0, totalQuantity: 0 })

    const disc = parseFloat(calculation.total*10/100).toFixed(2);
    setDiscount(disc);

    const GtotalAmt = calculation.total + 60 - disc;
    setTotal(calculation.total);
    setTotalQuantity(calculation.totalQuantity);
    setGTotal(GtotalAmt);
  }
  const notify = () => toastId.current = toast.error("Item removed sucessfully!",{
    position: "top-right",      
    autoClose: 100,              
    hideProgressBar: false,      
    closeOnClick: true,      
    pauseOnHover: true,       
    draggable: true,         
    progress: undefined,        
    theme: "dark",          
    style: { background: "red", color: "white" }, 
  });
  const dismiss = () =>  toast.dismiss(toastId.current);
  const REMOVEITEM =(id)=>{
       dispatch(removeFromCart(id));
       if(toastId.current)
       {
           dismiss();
       }
       notify();
  }

  const gotohome=(e)=>{
       e.preventDefault(); 
       navigate("/",{replace:true});
  }
  useEffect(() => {
    GetGrandTotal();
  }, [cartItem]);

  if (cartItem.length == 0) {
    return <EmptyCart />
  }
  return (
    <>
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            {/* <!-- cart --> */}
            <div className="col-lg-8">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your FoodItem cart</h4>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <div className="me-lg-2">


                        {
                          cartItem.map((item) => {
                            return (
                              <div className="cart_menu" key={item?.item?.card?.info?.id}>
                                <img src={item?.item?.card?.info?.imageId?IMG_CDN_URL + item?.item?.card?.info?.imageId:imagenotfound} className="border rounded me-3" />
                                <div className="details">
                                  <p className="heading">{item?.item?.card?.info.name}</p>
                                  <p className="description">{item?.item?.card?.info?.description}</p>
                                  <p className="quantity">₹ {((item?.item?.card?.info?.price? item?.item?.card?.info?.price/ 100:item?.item?.card?.info?.defaultPrice/ 100) * item.quantity).toFixed(2)} ({(item?.item?.card?.info?.price? item?.item?.card?.info?.price/ 100:item?.item?.card?.info?.defaultPrice/ 100)} * {item.quantity})</p>
                                  
                                  <div className="increment_remove">
                                    <div className="wrapper">
                                      <span className="minus" onClick={() => DECREMENTQUANTITY(item?.item?.card?.info?.id)}>-</span>
                                      <span className="num">{item?.quantity}</span>
                                      <span className="plus" onClick={() => INCREMENTQUANTITY(item?.item?.card?.info?.id)}>+</span>
                                    </div>
                                    <div className="remove">
                                      <button onClick={()=>REMOVEITEM((item?.item?.card?.info?.id))}>Remove</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }



                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* <!-- cart -->
            <!-- summary --> */}
            <div className="col-lg-4 mt-2">
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 className="mb-3 summery_title">Order Summery</h4>

                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Price ({totalQuantity} items)</p>
                    <p className="mb-2">₹ {Total.toFixed(2)} </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount (10%)</p>
                    <p className="mb-2 text-success">₹ {discount}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Delivery charges</p>
                    <p className="mb-2">₹ 60.00</p>
                  </div>
                  <div className="d-flex">
                    <p className="mb-2 save-message">You'll save ₹ {discount} on this order 🎉</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total Amount:</p>
                    <p className="mb-2 fw-bold">₹ {GTotal.toFixed(2)}</p>
                  </div>

                  <div className="mt-3">
                    <Link to={"/checkout"} className="btn btn-checkout w-100 shadow-0 mb-2">{loggedUser ?"Checkout":"sign in before checkout"}</Link>
                    
                    <a onClick={gotohome} className="btn btn-light w-100 border mt-2"> Back to Home </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- summary --> */}
          </div>
        </div>
      </section>
      <Toaster/>
    </>
  )
}

export default Cart