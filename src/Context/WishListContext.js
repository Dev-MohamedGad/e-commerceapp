import axios from "axios";
import { createContext } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  //add wishlist

 async function addwishList(prod_id, token) {
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,

      {
        productId: `${prod_id}`,
      },
      {
        headers: {
          token: `${token}`,
        },
      }
    )
  }

  //delfun wishlist
  function delwishlist(prod_id ,token) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${prod_id}`,
      {
        headers: {
          token
        }
      }
    );
  }

  // get wishdata
 
  return (
    <WishlistContext.Provider value={{ addwishList, delwishlist,  }}>
      {children}
    </WishlistContext.Provider>
  );
}
