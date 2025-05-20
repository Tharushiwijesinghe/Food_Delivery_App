// import { createContext } from 'react';
// import { food_list } from '../assets/assets';

// export const StoreContext = createContext(null)

// const StoreContextProvider = (props) => {


//   const contextValue = {
//     food_list
//   }
//   return(
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   )
// }

// export default StoreContextProvider




import React, { createContext, useState } from 'react';
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Cart state: item ID => quantity
  const [cartItems, setCartItems] = useState({});

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item  in cartItems)
    {
      if(cartItems[item] > 0)
      {
        let itemInfo = food_list.find((product) => product._id == item);
        totalAmount += itemInfo.price*cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
