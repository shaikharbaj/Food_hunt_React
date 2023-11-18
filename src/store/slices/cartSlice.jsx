import {createSlice} from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

const initialState = {
          cartItem :JSON.parse(localStorage.getItem("cart"))||[]
}
const cartSlice = createSlice({
       name:"cart",
       initialState,
       reducers:{
               addToCart:(state,action)=>{
                    state.cartItem.push({
                           item:action.payload,quantity:1
                    })
                    localStorage.setItem("cart",JSON.stringify(state.cartItem));
               },
               removeFromCart:(state,action)=>{
               
                state.cartItem.splice(state.cartItem.findIndex((item)=>item.item.card.info.id === action.payload),1);
                localStorage.setItem('cart',JSON.stringify(state.cartItem));
               },
               clearCart:(state,action)=>{

               },
               incrementQuantity:(state,action)=>{
                       state.cartItem =  state.cartItem.map((x)=>{
                           if(x.item.card.info.id === action.payload)
                           {
                               return {...x,quantity:x.quantity+1}
                           }
                           return x;
                     })


                     localStorage.setItem('cart',JSON.stringify(state.cartItem));
                    
               },
               decrementQuantity:(state,action)=>{
                state.cartItem =  state.cartItem.map((x)=>{
                    if(x.item.card.info.id === action.payload)
                    {
                        if(x.quantity>1)
                        {
                            return {...x,quantity:x.quantity-1}
                        }else{
                            return {...x,quantity:1}
                        }

                    }
                    return x;
              })


              localStorage.setItem('cart',JSON.stringify(state.cartItem));
               }  
       }
})

export default cartSlice.reducer;

export const {addToCart,removeFromCart,clearCart,incrementQuantity,decrementQuantity} = cartSlice.actions;

const cartItemSelector = ()=>useSelector((state)=>state.cart.cartItem);
export {cartItemSelector};