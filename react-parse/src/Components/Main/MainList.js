import React, { useEffect, useState } from "react";
import {getAllGames} from "../../Common/Services/GameService.js";
import CartService from "../../Common/Services/CartService";
import { Link } from "react-router-dom";

//creates the indiviual parts of that list and maps to work on all games
const MainList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
    getAllGames().then((games) => {
      console.log(games);
      setGames(games);
    });
  }, []);

  const handleAddToCart = async (game) => {
  try {
    await CartService.addToCart(game);
    alert(`${game.get("name")} added to cart!`);
  } catch (error) {
    console.error("Failed to add to cart:", error);
    alert("There was an error adding to cart.");
  }
};
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
          <button onClick={() => handleAddToCart(game)}>Add to Cart</button>
        </p>
      </div>
    </div>
  </li>
))}
      </ul>
      <nav>
        <Link to="/cartpage">Cart</Link>
      </nav>
    </div>
    );
    };

export default MainList;
