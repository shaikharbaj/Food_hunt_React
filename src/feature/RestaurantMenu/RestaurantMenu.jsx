import React, { useState, useEffect } from 'react'
import './RestaurantMenu.css'
import { useParams } from 'react-router-dom'
import RestaurantCategory from './RestaurantCategory'
import useRestaurantMenu from '../../Hooks/useRestaurantMenu'
import { IMG_CDN_URL } from '../../constant'
import { RestaurantMenuShimmer } from '../../Components/Shimmers/Shimmer'
const RestaurantMenu = () => {
  const { id } = useParams();
  const [resInfo,menuItem] = useRestaurantMenu(id);
  console.log(resInfo);
 if(!(resInfo && menuItem))
 {
     return <RestaurantMenuShimmer/>
 }
  return (
    <>
      <div className="restaurant-summary">
        <img className="restaurant-img"
          src={IMG_CDN_URL + resInfo?.cloudinaryImageId}
          alt="Img" />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{resInfo?.name}</h2>
          <p className="restaurant-tags">{resInfo?.cuisines.join(" ,")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating">
              <i className="fa-solid fa-star"></i>
              <span><i className='bx bxs-star me-1'></i>{resInfo?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{resInfo?.totalRatingsString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{resInfo?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant_menu container mt-5">
        {
          menuItem && (
            <div className="accordion accordion-flush" id="accordionFlushExample">

              {
                menuItem?.map((ele,index) => <RestaurantCategory  {...ele.card?.card} key
                ={Math.random()}/>)
              }
            </div>
          )
        }
      </div>

      
    </>

  )
}

export default RestaurantMenu