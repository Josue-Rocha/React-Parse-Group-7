import React, { useEffect, useState } from "react";
import CartService from "../../Common/Services/CartService";
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
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    CartService.getCart().then(setCartItems);
  }, []);

  const handleRemove = async (id) => {
    await CartService.removeFromCart(id);
    setCartItems(await CartService.getCart());
  };

  const total = cartItems
  .reduce((sum, item) => {
    const priceStr = item.game.get("price");
    const price = parseFloat(priceStr.replace(/^\$/, "")); // remove $ and parse
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0)
  .toFixed(2);
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
  {cartItems.map((item) => {
    const name = item.game.get("name");
    const price = item.game.get("price");
    const imageSrc = imageMap[name]; // get image based on game name

    return (
      <li key={item.id} className="cart-item">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={name}
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "5px" }}
          />
        )}
        <span>
          <strong>{name}</strong> — {price} x {item.quantity}
        </span>
        <button onClick={() => handleRemove(item.id)} style={{ marginLeft: "auto" }}>
          Remove
        </button>
      </li>
    );
  })}
</ul>
          <p><strong>Total:</strong> ${total}</p>
        </>
      )}
    </div>
  );
};

export default Cart;