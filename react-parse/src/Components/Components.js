import React from "react";
import Main from "./Main/Main.js";
import Cart from "./Cart/Cart.js";
import CartPage from "./Cart/CartPage.js";
import SiteFooter from "./SiteFooter/SiteFooter.js";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


  export default function Components() {
    return (
      <Router>
        <SiteFooter /> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>
  
      </Router>
    );
  }

/*
  const Components = () => {
    return (
      <div>
        <Main />
        <Cart />
      </div>
    );
  };

  export default Components;
*/