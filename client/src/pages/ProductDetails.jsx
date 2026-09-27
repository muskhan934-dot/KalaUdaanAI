import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Bot, Heart, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";
import { products, artisans } from "../data";
export default function ProductDetails(){
 const {id}=useParams(); const p=products.find(x=>x.id===id)||products[0]; const a=artisans.find(x=>x.id===p.artisanId)||artisans[0];
 const [ask,setAsk]=useState(false);
 return <main className="section detail-page">
  <Link className="back" to="/explore"><ArrowLeft size={16}/> Back to explore</Link>
  <div className="detail-grid"><div className="detail-image"><img src={p.image} alt={p.name}/><span className="verified big"><ShieldCheck size={16}/> Verified artisan</span></div>
  <div className="detail-copy"><span className="eyebrow">{p.craft} · {p.region}</span><h1>{p.name}</h1><div className="rating">★★★★★ <span>{p.rating} · 24 reviews</span></div><h2>₹{p.price.toLocaleString()}</h2><p>{p.description}</p>
   <div className="detail-actions"><button className="btn primary"><ShoppingBag size={18}/> Add to cart</button><button className="icon-btn large"><Heart/></button></div>
   <div className="mini-ai" onClick={()=>setAsk(!ask)}><Sparkles size={18}/><div><b>Ask Kalaudaan AI</b><span>“How should I maintain this?”</span></div></div>
   {ask && <div className="ai-answer"><Bot size={18}/><p>This handmade piece should be cleaned gently with a soft dry cloth and kept away from prolonged moisture.</p></div>}
   <Link className="artisan-mini" to={`/artisan/${a.id}`}><img src={a.image} alt={a.name}/><div><span>MADE BY</span><b>{a.name}</b><small>{a.craft} · {a.region}</small></div><ArrowLeft className="rotate" size={18}/></Link>
  </div></div>
  <div className="story-block"><span className="eyebrow">THE STORY</span><h2>More than an object.</h2><p>{a.story}</p></div>
 </main>
}
