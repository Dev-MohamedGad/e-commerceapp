import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CounterContextProvider from "./Context/ConterContext";
import { UserTokenProvider } from "./Context/UserToken";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(   
   <UserTokenProvider>
  <WishlistContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </CounterContextProvider>
      </CartContextProvider>
  </WishlistContextProvider>
  </UserTokenProvider>

);

reportWebVitals();
