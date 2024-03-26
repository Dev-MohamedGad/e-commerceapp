import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { UserToken } from "../Context/UserToken";
import Loading from "./Loading";
import useApi from "../hooks/useApi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { WishlistContext } from "../Context/WishListContext";

export default function FeaturedProducts() {
  let { addCart, setCartNums, setCartId } = useContext(CartContext);
  let { isLogin } = useContext(UserToken);
  let { addwishList, delwishlist } = useContext(WishlistContext);
  let [wishlist, setwishlist] = useState(
    localStorage.getItem("wish")
      ? localStorage.getItem("wish").split(",")
      : []
  );
  let { data, isLoading } = useApi("products", "products");
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const perPage = 12; // Number of items per page

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

  if (isLoading) return <Loading />;

  // Pagination logic
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = data?.data.data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.data.data.length / perPage);

  const handleClick = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="container">
        <div className="row position-relative ">
          {paginatedData.map((product) => (
            <div className="col-lg-2 col-md-3 col-sm-6" key={product._id}>
              <div className="product p-3 cursor-pointer g-2 shadow-sm position-relative  overflow-hidden">
                <button
                  className="btn-heart   fs-1   p-0  text-danger  position-absolute  end-0 top-0 "
                  onClick={async () => {
                    if (
                      wishlist.includes(product._id) != true &&
                      isLogin
                    ) {
                      addwishList(product._id, isLogin).then((result) => {
                        setwishlist(result.data.data);

                        toast.success(result.data.message, {
                          duration: 2000,
                          position: "top-center",
                        });
                      });
                    } else if (
                      wishlist.includes(product._id) &&
                      isLogin
                    ) {
                      delwishlist(product._id, isLogin).then((result) => {
                        setwishlist(result.data.data);
                        toast.error(result.data.message, {
                          duration: 2000,
                          position: "top-center",
                        });
                      });
                    }
                  }}
                >
                  {isLogin ? (
                    wishlist.includes(product._id) == true ? (
                      <AiFillHeart className="text-success" />
                    ) : (
                      <AiOutlineHeart className="text-success" />
                    )
                  ) : (
                    ""
                  )}
                </button>
                <Link to={`productdetails/${product._id}`}>
                  {" "}
                  <img src={product.imageCover} className="w-100" alt="img" />
                  <p className="text-main">{product.category.name}</p>
                  <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                  <div className="product-box d-flex justify-content-between">
                    <span>{product.price} EGP</span>
                    <span>
                      {" "}
                      <i className="fa-solid fa-star rating-color"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    addCartFun(product._id);
                  }}
                  className="btn bg-main text-white my-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <nav aria-label="Pagination" className="d-flex justify-content-center mt-5" >
          <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleClick(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${index === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handleClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handleClick(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
