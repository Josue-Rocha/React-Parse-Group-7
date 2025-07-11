import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteFooter from "./SiteFooter/SiteFooter";
import Main from "./Main/Main";
import CartPage from "./Cart/CartPage";
import ProfilePage from "./Auth/ProfilePage";
import LoginPage from "./Auth/LoginPage";
import ProtectedRoute from "./Auth/ProtectedRoute";


  export default function Components() {
    return (
      <Router>
      <SiteFooter />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/cartpage"
          element={
            <ProtectedRoute
              element={CartPage}
              path="/login"
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={ProfilePage}
              path="/login"
            />
          }
        />
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