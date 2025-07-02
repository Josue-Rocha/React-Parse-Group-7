import { Link } from "react-router-dom";

const SiteFooter = () => (
  <footer>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cartpage">CartPage</Link>
        </li>
      </ul>
    </nav>
  </footer>
);

export default SiteFooter;
