import React, { Suspense, lazy, useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brand from "./Components/Brand/Brand";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Categoris from "./Components/Categories/Categoris";
import { UserToken } from "./Context/UserToken";
import ProtectedRoute from "./Components/PrtotectedRoute";
import ProductDetails from "./Components/ProductDetails";
import { Toaster } from "react-hot-toast";
import Loading from "./Components/Loading";
import Orders from "./Components/Orders";
import { CartContext } from "./Context/CartContext";
import WishList from "./Components/Wishlist/WishList";
import ForgotPasswordForm from "./Components/ForgetPssword/forgetpassword";
import ResetPasswordForm from "./Components/ResetPassword/Restpassword";

const Cart = lazy(() => import("./Components/Cart/Cart"));

export default function App() {
  let test = "test";

  let { setIsLogin } = useContext(UserToken);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLogin(localStorage.getItem("userToken"));
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout test={test}></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "products", element: <Products></Products> },
        { path: "allorders", element: <Orders></Orders> },
        { path: "brands", element: <Brand></Brand> },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <Cart></Cart>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        { path: "categoris", element: <Categoris></Categoris> },
        {
          path: "productdetails/:id",
          element: <ProductDetails></ProductDetails>,
        },
        { path: "login", element: <Login></Login> },
        { path: "register", element: <Register></Register> },
        { path: "forgetpassword", element: <ForgotPasswordForm /> },
        { path: "resetpassword", element: <ResetPasswordForm /> },
        { path: "*", element: <NotFound></NotFound> },
        { path: "wishlist", element: <WishList></WishList> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </>
  );
}
