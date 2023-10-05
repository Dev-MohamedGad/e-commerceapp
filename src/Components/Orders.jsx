import React from "react";
import useApi from "../hooks/useApi";
import Loading from "./Loading";

export default function Orders() {
  let { data, isLoading } = useApi(
    "orders",
    `orders/user/${
      localStorage.getItem("idonwer") ? localStorage.getItem("idonwer") : ""
    }`
  );
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container">
        <div className="row  justify-content-center  ">
          {data?.data.map((prod) => (
            <div key={prod.id} className="col-md-3 product ">
              <img
                src={prod.cartItems[0].product.imageCover}
                className="w-100"
                alt="img"
              />
              <p>
                {prod.cartItems[0].product.title
                  .split(" ")
                  .slice(0, 3)
                  .join(" ")}
              </p>
              <p className="text-main">Price: {prod.totalOrderPrice}</p>
            </div>
          ))}
        </div>{" "}
      </div>
    </>
  );
}
