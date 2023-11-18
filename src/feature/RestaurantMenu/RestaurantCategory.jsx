import React, { useRef } from 'react'
import { IMG_CDN_URL } from '../../constant'
import IMG_NOT_AVAILABLE from '../../assets/no-image.png'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { addToCart, cartItemSelector,incrementQuantity,decrementQuantity } from '../../store/slices/cartSlice'
const RestaurantCategory = (props) => {
     
    const dispatch = useDispatch();
    const cartItem = cartItemSelector();
    //generate unique id for accordian.....
    const id = props.title.split(" ")[0]+Math.floor(Math.random() * Date.now()).toString(36);

    

    const toastId=useRef(null);
   
    const INCREMENTQUANTITY = (item) => {
        dispatch(incrementQuantity(item));
      }
    
      const DECREMENTQUANTITY = (item) => {
        dispatch(decrementQuantity(item));
      }

      const notify = () => toastId.current = toast.success("Item Added successfully",{
        position: "top-center",      
        autoClose: 100,              
        hideProgressBar: false,      
        closeOnClick: true,      
        pauseOnHover: true,       
        draggable: true,         
        progress: undefined,        
        theme: "dark", 
        style: { background: "#00ad1d", color: "white" },          
        
      });
      const dismiss = () =>  toast.dismiss(toastId.current);
     
      const ADDTOCART = (item) => {
        dispatch(addToCart(item));
        if(toastId.current)
        {
            dismiss();
        }
        notify();
    }

    return (
        <>
            <div className="accordion-item mb-2">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={"#" + id} aria-expanded="false" aria-controls={id}>
                        <strong>{`${props.title}(${props.itemCards.length})`}</strong>
                    </button>
                </h2>
                <div id={id} className="accordion-collapse collapse show" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    {
                        props?.itemCards?.map((menu) => {
                            return (
                                <div className="accordion-body" key={menu?.card?.info?.id}>
                                    <div className="menu">
                                        <div className="left">
                                            <i className='bx bx-book-content icon'></i>
                                            <p className="menu-title">
                                                {menu?.card?.info?.name}
                                            </p>
                                            <p className="price">Rs. {menu?.card?.info?.defaultPrice ? (menu?.card?.info?.defaultPrice / 100) : (menu?.card?.info?.price / 100)}</p>
                                            <p className="description">{menu?.card?.info?.description}</p>
                                        </div>
                                        <div className="right">
                                            <div className="img">
                                                <img
                                                    src={menu?.card?.info?.imageId ? IMG_CDN_URL + menu?.card?.info?.imageId : IMG_NOT_AVAILABLE}
                                                    alt="" />
                                                {
                                                    cartItem.find(x => x.item.card.info.id === menu?.card?.info.id) ? <div className="increment_remove">
                                                        <div className="wrapper">
                                                            <span className="minus" onClick={() => DECREMENTQUANTITY(menu?.card?.info?.id)}>-</span>
                                                            <span className="num">{cartItem.find(x => x.item.card.info.id === menu?.card?.info.id).quantity}</span>
                                                            <span className="plus" onClick={() => INCREMENTQUANTITY(menu?.card?.info?.id)}>+</span>
                                                        </div>
                                                    </div> : <button onClick={() => ADDTOCART(menu)}>ADD +</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Toaster/>
        </>
    )
}

export default RestaurantCategory