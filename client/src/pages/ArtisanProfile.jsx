import { useParams, Link } from "react-router-dom";
import { MapPin, BadgeCheck } from "lucide-react";
import { artisans, products } from "../data";
import ProductCard from "../components/ProductCard";
export default function ArtisanProfile(){
 const {id}=useParams(); const a=artisans.find(x=>x.id===id)||artisans[0];
 return <main><section className="artisan-hero"><img src={a.image} alt={a.name}/><div><span className="eyebrow">ARTISAN PROFILE</span><h1>{a.name}</h1><p className="artisan-title">{a.craft}</p><p><MapPin size={16}/> {a.region} · {a.experience}</p><span className="verified"><BadgeCheck size={15}/> Verified artisan</span></div></section>
 <section className="section artisan-content"><div className="story-block"><span className="eyebrow">CRAFT JOURNEY</span><h2>A tradition carried forward.</h2><p>{a.story}</p></div><h2>Products by {a.name.split(" ")[0]}</h2><div className="product-grid">{products.filter(p=>p.artisanId===a.id).map(p=><ProductCard key={p.id} p={p}/>)}</div></section></main>
}
