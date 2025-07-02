
import React from "react";

import MainList from "./MainList.js";
//Sets up the list for the games
const Main = () => {

  return (
    <div>
    <div id="main">
      <h1>Welcome to GameNerd</h1>
      <h2>Your favorite website for anything games.</h2>
    </div>
    <MainList />
    </div>
  );
};

export default Main;
