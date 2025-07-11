import { useNavigate } from "react-router-dom"; // useHistory
import Cart from "./Cart.js";
import "./Cart.css";

export default function CartPage() {
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  };

  return (
    <div className="cart-container">
      <Cart />
    </div>
  );
}
