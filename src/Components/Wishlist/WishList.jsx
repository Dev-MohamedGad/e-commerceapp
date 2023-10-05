import React, { useContext } from "react";
import Loading from "../Loading";
import { useQuery } from "react-query";
import axios from "axios";

export default function WishList() {
  async function getwishdata() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: `${localStorage.getItem("userToken")}`,
      },
    });
  }
  let { data, isLoading } = useQuery("wishList", getwishdata);
  if (isLoading) return <Loading />;
  console.log(data?.data.data);
  return (
    <>
      <div className="container mt-3">
       {data?.data.data.length ==0?  <h1 className="h-100 d-flex justify-content-center align-items-center">WishList is Empty</h1> :  <div className="row">
          {data?.data.data.map((wish) => (
            <div
              className="col-lg-2 col-md-3 col-sm-6  g-2 shadow-sm product"
              key={wish.id}
            >
              <img src={wish.imageCover} className="w-100" alt="" />
              <p>{wish.title.split(" ").slice(0, 2).join(" ")}</p>
              <p className="float-start text-success ">Price</p>

              <p className="float-end text-success "> {wish.price}</p>
            </div>
          ))}
        </div>}
       
      </div>
    </>
  );
}
