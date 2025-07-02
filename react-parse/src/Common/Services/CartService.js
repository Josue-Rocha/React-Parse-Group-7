// src/Common/Services/CartService.js
import Parse from 'parse';

const CartItem = Parse.Object.extend("Cart");

// Get current user cart
const getCart = async () => {
  const query = new Parse.Query(CartItem);
  const user = Parse.User.current();
  if (user) {
    query.equalTo("user", user);
  }
  const results = await query.find();
  return results.map((item) => ({
    id: item.id,
    game: item.get("game"),
    quantity: item.get("quantity"),
  }));
};

// Add a game to cart
const addToCart = async (game) => {
  const user = Parse.User.current();
  const query = new Parse.Query(CartItem);
  query.equalTo("gameId", game.id);
  if (user) query.equalTo("user", user);

  const existingItem = await query.first();

  if (existingItem) {
    existingItem.increment("quantity");
    await existingItem.save();
  } else {
    const cartItem = new CartItem();
    cartItem.set("gameId", game.id);
    cartItem.set("game", game); // You can store full object or pointer
    cartItem.set("quantity", 1);
    if (user) {
      cartItem.set("user", user);
    }
    await cartItem.save();
  }
};

// Remove a game from cart
const removeFromCart = async (cartItemId) => {
  const query = new Parse.Query(CartItem);
  const item = await query.get(cartItemId);
  if (item) {
    await item.destroy();
  }
};

// Clear the entire cart
const clearCart = async () => {
  const query = new Parse.Query(CartItem);
  const user = Parse.User.current();
  if (user) query.equalTo("user", user);
  const items = await query.find();
  for (const item of items) {
    await item.destroy();
  }
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};