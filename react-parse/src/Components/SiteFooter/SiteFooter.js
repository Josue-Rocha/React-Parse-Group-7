import { Link } from "react-router-dom";
const SiteFooter = () => (
  <div className="container3">
  <header className="site-header">
    <div className="site-title">Game Store</div>
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cartpage">Cart</Link>
        </li>
      </ul>
    </nav>
  </header>
       </div>
);
export default SiteFooter;
