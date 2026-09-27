import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleWishlist, getWishlist } from "../services/productService";
import { useState } from "react";

export default function ProductCard({p}){
  const [wishlisted, setWishlisted] = useState(() => getWishlist().includes(p.id));
  const title = typeof p.title === "object" ? (p.title.en || Object.values(p.title)[0]) : (p.title || p.name || "Product");
  const fallback = "/assets/offline-heritage.svg";
  const handleWishlist = (e) => { e.preventDefault(); setWishlisted(toggleWishlist(p.id).includes(p.id)); };
  return <motion.article className="product-card" whileHover={{y:-8, rotateX:1.5}}>
    <div className="product-image-wrap">
      <img src={p.image} alt={title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}/>
      <button className={`heart ${wishlisted ? "active" : ""}`} onClick={handleWishlist} aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wishlisted}><Heart size={17}/></button>
      <span className="verified">✓ Verified</span>
    </div>
    <div className="product-info">
      <div className="eyebrow">{p.craft} · {p.region}</div>
      <h3>{title}</h3>
      <div className="product-bottom">
        <strong>₹{p.price.toLocaleString()}</strong>
        <span>★ {p.rating}</span>
      </div>
      <Link className="text-link" to={`/product/${p.id}`}>View product <ArrowUpRight size={16}/></Link>
    </div>
  </motion.article>
}
