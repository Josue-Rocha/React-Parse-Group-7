import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Parse from "parse";

import persona from '../../Images/Persona.jpg';
import eldenRing from '../../Images/Elden_Ring.jpeg';
import monsterHunter from '../../Images/Monster_Hunter.png';
import rdr2 from '../../Images/rdr2.jpg';
import tlou from '../../Images/tlou.jpg';

const imageMap = {
  "Persona 5 Royal": persona,
  "Elden Ring": eldenRing,
  "Monster Hunter Wilds": monsterHunter,
  "Red Dead Redemption II": rdr2,
  "The Last of Us": tlou
};

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      console.log("Fetching game with id:", id);
      const Game = Parse.Object.extend("Games");
      const query = new Parse.Query(Game);
      try {
        const result = await query.get(id);
        setGame(result);
      } catch (err) {
        console.error("Error fetching game:", err);
        setError("Game not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <p>Loading game details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{game.get("name")}</h2>
      <img
        src={imageMap[game.get("name")] || 'https://via.placeholder.com/500x400?text=No+Image'}
        alt={game.get("name")}
        width="600"
        height="500"
        style={{ border: "3px solid black", marginBottom: "20px" }}
      />
      
      <p><strong>Creator:</strong> {game.get("creator")}</p>
      <p><strong>Rating (IGN):</strong> {game.get("rating")}</p>
      <p><strong>Price:</strong> ${game.get("price")}</p>
      <p><strong>Description:</strong> {game.get("description") || "No description available."}</p>
    </div>
  );
};

export default GameDetails;