import React, { useEffect, useState } from "react";
import CartService from "../../Common/Services/CartService";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    CartService.getCart().then(setCartItems);
  }, []);

  const handleRemove = async (id) => {
    await CartService.removeFromCart(id);
    setCartItems(await CartService.getCart());
  };

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.game.price), 0).toFixed(2);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.game.get("name")} — ${item.game.get("price")} x {item.quantity}
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total}</p>
        </>
      )}
    </div>
  );
};

export default Cart;