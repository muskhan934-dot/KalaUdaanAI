import { useMemo, useState } from "react";
import { Search, Mic, Upload, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, crafts } from "../data";
export default function Explore(){
 const [q,setQ]=useState("");
 const filtered=useMemo(()=>products.filter(p=>(p.name+" "+p.craft+" "+p.region).toLowerCase().includes(q.toLowerCase())),[q]);
 return <main className="section explore-page">
   <div className="explore-hero"><span className="eyebrow">AI-POWERED DISCOVERY</span><h1>Find the craft<br/><em>you didn't know you wanted.</em></h1>
   <div className="search-box"><Search size={20}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder='Try “handmade pottery under ₹1500”'/><button title="Voice search"><Mic/></button><button title="Visual search"><Upload/></button></div>
   <div className="search-chips">{["Pottery","Handloom","Under ₹1500","For gifting"].map(x=><button key={x} onClick={()=>setQ(x)}>{x}</button>)}</div></div>
   <div className="filter-row"><b>{filtered.length} products</b><button><SlidersHorizontal size={16}/> Filters</button></div>
   <div className="product-grid">{filtered.map(p=><ProductCard key={p.id} p={p}/>)}</div>
 </main>
}
