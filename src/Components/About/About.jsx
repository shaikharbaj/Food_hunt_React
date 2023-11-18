import React, { useState } from "react";
import AboutImg from "../../assets/AboutImg.jpg";
import Profile from '../../assets/WhatsApp Image 2023-11-18 at 2.48.17 PM.jpeg'
import "./about.css";
const About = () => {
    const [show,setShow]=useState(false);
    const [btnName,setBtnName]=useState("Show My Profile");
    const HideShowProfile=()=>{
           setShow(!show);
           if(show)
           {
               setBtnName('Show My Profile');
           }else{
               setBtnName('Hide My Profile');
           } 
    }

    // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjLE9Ylr4f4BXaJfXkLC0YGydJDZVQoxK0Dg&usqp=CAU
  return (
    <>
      <div className="profile">
        <button className="profile_btn" onClick={HideShowProfile}>{btnName}</button>
        {
             show && <div className="profile_intro">
             <p className="heading">About Me</p>
             {/* <img
               src={Profile}
               alt="img"
             /> */}
             <div className="image">
                  
             </div>
             <div className="skills">
               <p className="skill">
                 HTML | CSS | Bootstrap | Javascript | ReactJS | NodeJS | MongoDB |
                 SQL
               </p>
             </div>
             <div className="social_media">
             <ul>
               <li className="linkedin">
                 <a href="https://www.linkedin.com/in/arbaj-dilip-shaikh/">
                   <i class="bx bxl-linkedin-square"></i>
                 </a>
               </li>
               <li className="github">
                 <a href="https://github.com/shaikharbaj">
                   <i class="bx bxl-github"></i>
                 </a>
               </li>
               <li className="gmail">
                 <a href="mailto:shaikharbaj2001@gmail.com">
                   <i class="bx bxl-gmail"></i>
                 </a>
               </li>
             </ul>
           </div>
           </div>
        }
      </div>
      <div className="about">
        <img src={AboutImg} alt="aboutimg" className="img-fluid" />
        <h3>FoodHunt🍔</h3>
        <p>
          FoodHunt is a food ordering web application built with React.js ⚛ and
          Swiggy's API.
        </p>
      </div>
    </>
  );
};

export default About;
