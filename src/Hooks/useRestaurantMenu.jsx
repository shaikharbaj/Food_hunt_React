import { swiggy_menu_api_URL, RESTAURANT_TYPE_KEY } from '../constant'
import { useState, useEffect } from 'react'
const useRestaurantMenu = (id) => {
    const [resInfo, setResInfo] = useState(null);
    const [menuItem, setMenuItem] = useState([]);
    const GetResMenu = async () => {
        try {

            const res = await fetch(swiggy_menu_api_URL + id);
            const json = await res.json();

            const RestaurantInfo = await json?.data?.cards.map(x => x.card)?.find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
            setResInfo(RestaurantInfo);

            const MenuItem = await json?.data?.cards.find(x=>x.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(x => x?.card?.card['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory');

            setMenuItem(MenuItem);
            
        } catch (error) {
            console.log(error)
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