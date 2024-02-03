import {swiggy_api_URL, RESTAURANT_TYPE_KEY } from '../constant'
import axios from 'axios';
import { useState, useEffect } from 'react'
import RESTAURANT_MENU from '../utils/RestaurantMenu.jsx'
const useRestaurantMenu = (id) => {
    const [resInfo, setResInfo] = useState(null);
    const [menuItem, setMenuItem] = useState([]);
    const GetResMenu = async () => {
        try {
            // const { data } = await axios.get(swiggy_api_URL + `/${id}`);
            // const RestaurantInfo = await data?.data?.cards.map(x => x.card)?.find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
            // setResInfo(RestaurantInfo);

            // const MenuItem = await data?.data?.cards.find(x=>x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(x => x?.card?.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');

            // setMenuItem(MenuItem);

            const data = await RESTAURANT_MENU.filter((menu)=>menu?.data?.cards[0]?.card?.card?.info?.id==id);
            
             const RestaurantInfo = await data[0]?.data?.cards.map(x => x.card)?.find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
            setResInfo(RestaurantInfo);

            const MenuItem = await data[0]?.data?.cards.find(x=>x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(x => x?.card?.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');

            setMenuItem(MenuItem);
            
            
        } catch (error) {
           
            setResInfo(null);
            setMenuItem([]);
        }
    }
    useEffect(() => {
        GetResMenu();
    }, [])

    return [resInfo, menuItem];
}

export default useRestaurantMenu;