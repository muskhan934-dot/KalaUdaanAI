import { Link } from "react-router-dom";
import { Plus, Package, ShoppingBag, TrendingUp, Sparkles } from "lucide-react";
export default function SellerDashboard(){
 return <main className="dashboard"><aside className="sidebar"><div className="side-brand">KALA<span>UDAAN</span></div>{["Overview","Products","Orders","Inventory","AI Studio","Analytics","Profile","Settings"].map((x,i)=><a key={x} className={i===0?"active":""}>{x}</a>)}</aside>
 <section className="dash-main"><div className="dash-top"><div><span className="eyebrow">ARTISAN STUDIO</span><h1>Good morning, Lakshmi 👋</h1></div><Link className="btn primary" to="/seller/products/new"><Plus size={18}/> Add product</Link></div>
 <div className="stat-grid"><div><Package/><span>Products</span><b>18</b></div><div><ShoppingBag/><span>Orders</span><b>42</b></div><div><TrendingUp/><span>Revenue</span><b>₹24,850</b></div><div><Sparkles/><span>AI listing score</span><b>92%</b></div></div>
 <div className="dash-grid"><div className="panel chart"><span className="eyebrow">SALES OVERVIEW</span><h2>Growing steadily.</h2><div className="fake-chart"><div style={{height:"35%"}}/><div style={{height:"48%"}}/><div style={{height:"42%"}}/><div style={{height:"64%"}}/><div style={{height:"57%"}}/><div style={{height:"82%"}}/><div style={{height:"92%"}}/></div></div>
 <div className="panel ai-panel"><Sparkles/><span className="eyebrow">AI SALES ADVISOR</span><h2>Your pottery listings are getting more views.</h2><p>Try adding regional-language keywords and a making-process image.</p><button className="text-link">Improve listing →</button></div></div>
 </section></main>
}
