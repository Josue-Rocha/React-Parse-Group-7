import { useNavigate } from "react-router-dom"; // useHistory
import Cart from "./Cart.js";

export default function CartPage() {
  const history = useNavigate();

  const buttonHandler = () => {
    history("/");
  };

  return (
    <section>
      <h1>Welcome to the CartPage component</h1>
      <p>This is the Cart Page</p>
      <button onClick={buttonHandler}>Home</button>
      <Cart />
    </section>
  );
}
