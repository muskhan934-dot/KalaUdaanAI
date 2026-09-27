import { Link } from "react-router-dom";
import { ShoppingBag, Store } from "lucide-react";
export default function Role(){
 return <main className="role-page section"><div className="center-head"><span className="eyebrow">STEP 01</span><h1>How will you use Kalaudaan?</h1><p>Choose a journey. You can change this later.</p></div>
 <div className="role-grid">
  <Link className="role-card" to="/buyer"><ShoppingBag size={34}/><h2>I'm a Buyer</h2><p>Discover, compare and purchase authentic handmade crafts.</p><span>Enter marketplace →</span></Link>
  <Link className="role-card accent" to="/seller"><Store size={34}/><h2>I'm an Artisan</h2><p>Build your digital profile and sell your craft with AI assistance.</p><span>Start selling →</span></Link>
 </div></main>
}
