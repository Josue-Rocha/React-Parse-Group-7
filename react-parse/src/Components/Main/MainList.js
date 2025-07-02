import React, { useEffect, useState } from "react";
import {getAllGames} from "../../Common/Services/GameService.js";

//creates the indiviual parts of that list and maps to work on all games
const MainList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
    getAllGames().then((games) => {
      console.log(games);
      setGames(games);
    });
  }, []);
    return(
    <div id="main2">
      <hr />
      <ul class="no-bullets">
        {games.map((game, index) => (
  <li key={index}>
    <div className="container">
      <div className="image">
        <img
          src={game.get("cover")}
          height="400"
          width="500"
          alt={game.get("name")}
          style={{
            border: "5px solid #000000",
            padding: "3px",
            margin: "5px",
            float: "left",
          }}
        />
      </div>
      <div className="text">
        <h3>{game.get("name")}</h3>
        <p>
          Creator: <b>{game.get("creator")}</b><br />
          Rating (According to IGN): <b>{game.get("rating")}</b><br />
          Price: <b>{game.get("price")}</b><br />
        </p>
      </div>
    </div>
  </li>
))}
      </ul>
    </div>
    );
    };

export default MainList;
