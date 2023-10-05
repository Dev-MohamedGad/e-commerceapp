import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { UserToken } from "../Context/UserToken";
import toast from "react-hot-toast";
import Loading from "./Loading";

export default function ProductDetails() {
  let { addCart, setCartNums, setCartId } = useContext(CartContext);

  let { isLogin } = useContext(UserToken);
  async function addCartFun(id) {
    let res = await addCart(id);

    if (!isLogin) {
      toast.error(res.response.data.message);
      return;
    }
    toast.success(res.data.message, {
      duration: 2000,
      position: "top-center",
    });
    setCartNums(res?.data.numOfCartItems);
    setCartId(res?.data.data._id);
  }

  let { id } = useParams();

  const BaseUrl = "https://ecommerce.routemisr.com";
  function getData() {
    return axios.get(`${BaseUrl}/api/v1/products/${id}`);
  }

  const { isLoading, data } = useQuery("productsdetails", getData);
  console.log(data?.data);

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-3">
          <img src={data?.data.data.imageCover} className="w-100" alt="img" />
        </div>
        <div className="col-md-9">
          <p>{data?.data.data.title}</p>
          <p>{data?.data.data.description}</p>
          <p>{data?.data.data.category.name}</p>
          <div className="box d-flex justify-content-between">
            <span className="fw-bolder">{data?.data.data.price}EGP</span>
            <span className="fw-bolder">
              {data?.data.data.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button
            onClick={() => {
              addCartFun(data?.data.data._id);
            }}
            className="btn form-control bg-main text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
