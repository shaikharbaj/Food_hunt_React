import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice=createSlice({
      name:"userAuth",
      initialState:{
            users: JSON.parse(localStorage.getItem('users'))||[],
            loggedUser:JSON.parse(localStorage.getItem('loggedUser'))|| null
      },
      reducers:{
               login:(state,action)=>{
                state.loggedUser=action.payload;
                localStorage.setItem('loggedUser',JSON.stringify(action.payload));
               },
               signup:(state,action)=>{
                     state.users.push(action.payload);
                     localStorage.setItem('loggedUser',JSON.stringify(action.payload));
                     state.loggedUser=action.payload;
                     localStorage.setItem('users',JSON.stringify(state.users));
               },
               logout:(state,action)=>{
                    localStorage.removeItem('loggedUser');
                    state.loggedUser=null;
               }
      }
}) 

export default userAuthSlice.reducer;
export const {login,signup,logout} = userAuthSlice.actions;
export const userSelector=()=>userSelector((state)=>state.user.loggedUser);