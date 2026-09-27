import { Link } from "react-router-dom";
import { Mic, ImagePlus, Sparkles } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data";
export default function BuyerHome(){
 return <main className="section buyer-home"><div className="buyer-banner"><div><span className="eyebrow">YOUR AI CRAFT COMPANION</span><h1>What are you looking for?</h1><p>Speak naturally. Kalaudaan will help you discover it.</p></div><div className="voice-demo"><Mic size={25}/><div className="wave"><i/><i/><i/><i/><i/><i/><i/></div><span>“Show me a handmade gift under ₹1500”</span></div></div>
 <div className="quick-tools"><Link to="/explore"><Sparkles/> AI natural search</Link><Link to="/explore"><Mic/> Voice search</Link><Link to="/explore"><ImagePlus/> Search by image</Link></div>
 <div className="section-head"><div><span className="eyebrow">RECOMMENDED</span><h2>Picked for you.</h2></div></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} p={p}/>)}</div></main>
}
