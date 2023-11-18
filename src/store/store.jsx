import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice';
import userAuthSlice from './slices/userAuthSlice';

const store = configureStore({
    reducer:{
           'cart':cartSlice ,
           'user':userAuthSlice 
    }
})

export default store;