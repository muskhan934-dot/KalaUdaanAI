import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Sparkles, Heart } from "lucide-react";

export default function Navbar(){
  return <header className="navbar">
    <Link to="/" className="brand">KALA<span>UDAAN</span></Link>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/craft-map">Craft Map</NavLink>
      <NavLink to="/buyer">Buyer</NavLink>
      <NavLink to="/seller">Seller</NavLink>
    </nav>
    <div className="nav-actions">
      <Link className="icon-btn" to="/cart" aria-label="Cart"><ShoppingBag size={19}/></Link>
      <Link className="ai-nav" to="/buyer"><Sparkles size={16}/> Ask Kalaudaan AI</Link>
      <Link className="login-link" to="/login">Login</Link>
    </div>
  </header>
}
