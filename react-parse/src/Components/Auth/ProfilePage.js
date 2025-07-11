import React from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = Parse.User.current();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Parse.User.logOut();
    navigate("/login");
  };

  if (!user) {
    return <p>Loading or not logged in...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, {user.get("username")}!</h2>
      <p>Email: {user.get("email") || "N/A"}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;