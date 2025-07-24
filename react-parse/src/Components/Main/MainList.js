import React, { useEffect, useState } from "react";
import { getAllGames } from "../../Common/Services/GameService.js";
import CartService from "../../Common/Services/CartService";
import persona from '../../Images/Persona.jpg';
import eldenRing from '../../Images/Elden_Ring.jpeg';
import monsterHunter from '../../Images/Monster_Hunter.png';
import rdr2 from '../../Images/rdr2.jpg';
import tlou from '../../Images/tlou.jpg';
import Parse from "parse";

const imageMap = {
  "Persona 5 Royal": persona,
  "Elden Ring": eldenRing,
  "Monster Hunter Wilds": monsterHunter,
  "Red Dead Redemption II": rdr2,
  "The Last of Us": tlou
};

const MainList = () => {
  const user = Parse.User.current();
  const [games, setGames] = useState([]);
  const [sortOption, setSortOption] = useState("name-asc");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    getAllGames().then((games) => {
      setGames(games);
    });
  }, []);

  const handleAddToCart = async (game) => {
    if (user) {
      try {
        await CartService.addToCart(game);
        alert(`${game.get("name")} added to cart!`);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        alert("There was an error adding to cart.");
      }
    } else {
      alert(`You must log in to add to cart`);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  // Filter then sort the games
  const filteredGames = games.filter((game) => {
    const name = game.get("name")?.toLowerCase() || "";
    const creator = game.get("creator")?.toLowerCase() || "";
    const rating = game.get("rating")?.toString().toLowerCase() || "";
    const search = filterText.toLowerCase();
    return name.includes(search) || creator.includes(search) || rating.includes(search);
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.get("name").localeCompare(b.get("name"));
      case "name-desc":
        return b.get("name").localeCompare(a.get("name"));
      case "price-asc":
        return a.get("price") - b.get("price");
      case "price-desc":
        return b.get("price") - a.get("price");
      default:
        return 0;
    }
  });

  return (
    <div id="main2">
      <hr />

      {/* Filter and Sort Controls */}
      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Search by name, creator, or rating"
          value={filterText}
          onChange={handleFilterChange}
          style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />

        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="name-asc">Alphabetical (A-Z)</option>
          <option value="name-desc">Alphabetical (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <ul className="no-bullets">
        {sortedGames.map((game, index) => (
          <li key={index}>
            <div className="container">
              <div className="image">
                <img
                  src={imageMap[game.get("name")] || 'https://via.placeholder.com/500x400?text=No+Image'}
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
                  Rating (IGN): <b>{game.get("rating")}</b><br />
                  Price: <b>${game.get("price")}</b><br />
                  <button onClick={() => handleAddToCart(game)}>Add to Cart</button>
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