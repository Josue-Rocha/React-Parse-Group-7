import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Parse from "parse";

const ProtectedRoute = ({ element: Component, path, ...rest }) => {
  const navigate = useNavigate();
  const currentUser = Parse.User.current();

  const goBackHandler = () => {
    navigate(-1);
  };

  if (currentUser) {
    return <Component {...rest} />;
  } else {
    return (
      <div>
        <p>Unauthorized!</p>
        <button onClick={goBackHandler}>Go Back</button>
        <Navigate to={path || "/login"} replace />
      </div>
    );
  }
};

export default ProtectedRoute;