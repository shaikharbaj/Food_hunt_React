import React, { useState, useEffect } from 'react'
import { swiggy_api_URL, IMG_CDN_URL } from '../../constant';
import './body.css';
import { RestaurantListShimmer } from '../../Components/Shimmers/Shimmer';
import { Link } from 'react-router-dom';
const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // const VegRestaurantCard = withVegLabel(RestaurantCard);
  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);


  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {

    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();
      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }
  //filter logic
  const filterData = (searchText, restaurant) => {
    const filteritem = restaurant?.filter((restaurant) => {
      return restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase());
    })
    return filteritem;
  }
  //search functionality
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  const SearchText=(e)=>{
    if(e.target.value.length===0){
         setFilteredRestaurants(allRestaurants);
    }
    setSearchText(e.target.value);
  }
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="main-search-input-wrap">
              <div className="main-search-input fl-wrap">
                <div className="main-search-input-item">
                  <input type="text" value={searchText} placeholder="Search Restaurant" onChange={SearchText} />
                </div>

                <button className="main-search-button" onClick={() => searchData(searchText, allRestaurants)}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="main-container">
        <section className="restaurants">
          <div className="container-fluid">
            <div className="item-bar">
              <div className="number">{filteredRestaurants.length} restaurants</div>
              <div className="filters">
                {/* <!-- <div className="relevance">Relevance</div>
                <div className="delivery">Delivery Time</div>
                <div className="rating">Rating</div>
                <div className="cost-lh">Cost: Low to High</div>
                <div className="cost-hl">Cost: High to Low</div> --> */}
              </div>
            </div>
            <div className="restaurant-list">

              {
                allRestaurants.length === 0 ? <RestaurantListShimmer /> : <>
                  {
                    filteredRestaurants.length === 0 ? <h1>No restaurant found</h1> : filteredRestaurants.map((restaurant, index) => {
                      return  <Link to={`/restaurant/${restaurant?.info?.id}`} key={restaurant?.info?.id}>
                           <div className="place">
                        <div className="list-item">
                          <div className="item-content">
                            <div className="top-img">
                              <img className="_2tuBw _12_oN" alt="La Pino'z Pizza"
                                src={IMG_CDN_URL + restaurant?.info?.cloudinaryImageId
                                }
                                width="254" height="160" />
                            </div>

                            <div className="place-name-div">
                              <div className="name">{restaurant?.info?.name}</div>
                              <div className="food-items">
                                {restaurant?.info?.cuisines.join(", ")}</div>
                            </div>
                            <div className="info-div">
                              <div className="rating">
                                <span className="icon-star"><i className='bx bxs-star'></i></span>
                                <span>{restaurant?.info?.avgRating}</span>
                              </div>
                              <div>•</div>
                              <div>{restaurant?.info?.sla?.slaString}</div>
                              <div>•</div>
                              <div className="price">{restaurant?.info?.costForTwo}</div>
                            </div>
                            <div className="location">
                              <p>{restaurant?.info?.areaName}</p>
                            </div>
                          </div>
                        </div>

                      </div>
                      </Link>
                      
                    })
                  }
                </>
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Body