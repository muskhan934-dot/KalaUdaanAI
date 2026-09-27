import { Link } from "react-router-dom";
import { ArrowRight, Mic, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import AIOrb from "../components/AIOrb";
import { crafts, products, artisans } from "../data";

export default function Home(){
  return <main>
    <section className="hero">
      <ParticleBackground/>
      <div className="hero-grid"/>
      <div className="hero-copy">
        <div className="kicker"><Sparkles size={14}/> AI × INDIAN CRAFT</div>
        <h1>Where <em>tradition</em><br/>meets intelligence.</h1>
        <p>Discover authentic handmade crafts, meet the people behind them, and give every artisan a digital doorway to the world.</p>
        <div className="hero-buttons">
          <Link className="btn primary" to="/explore">Explore Crafts <ArrowRight size={18}/></Link>
          <Link className="btn secondary" to="/role">Start Selling</Link>
        </div>
        <div className="hero-proof">
          <span><ShieldCheck size={17}/> Artisan-first</span>
          <span><Mic size={17}/> Voice-first</span>
          <span><ScanSearch size={17}/> AI discovery</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
        <AIOrb/>
        <motion.div className="floating-craft craft-one" animate={{y:[0,-16,0],rotate:[-5,3,-5]}} transition={{duration:5,repeat:Infinity}}>🏺</motion.div>
        <motion.div className="floating-craft craft-two" animate={{y:[0,14,0],rotate:[6,-4,6]}} transition={{duration:6,repeat:Infinity}}>🧶</motion.div>
        <motion.div className="ai-scan-card">
          <div className="scan-line"/>
          <b>AI CRAFT SCAN</b>
          <span>Pottery · Terracotta</span>
          <span>Listing ready ✓</span>
        </motion.div>
      </div>
    </section>

    <section className="marquee"><div>TRADITION • TECHNOLOGY • TRUST • STORY • COMMUNITY • TRADITION • TECHNOLOGY • TRUST • STORY • COMMUNITY •</div></section>

    <section className="section">
      <Reveal><div className="section-head"><div><span className="eyebrow">DISCOVER</span><h2>Crafts with a story.</h2></div><Link className="text-link" to="/explore">View all crafts <ArrowRight size={16}/></Link></div></Reveal>
      <div className="craft-grid">
        {crafts.map((c,i)=><Reveal key={c.name}><motion.div className="craft-card" whileHover={{scale:1.025}}>
          <img src={c.image} alt={c.name}/><div className="craft-overlay"><span>{c.icon}</span><h3>{c.name}</h3><p>{c.region}</p></div>
        </motion.div></Reveal>)}
      </div>
    </section>

    <section className="ai-story section">
      <Reveal><div className="eyebrow">THE KALAUDAAN DIFFERENCE</div><h2>From a photograph<br/>to a marketplace listing.</h2></Reveal>
      <div className="flow">
        <Reveal><div className="flow-card"><span>01</span><b>📸 Capture</b><p>Take a photo of the craft.</p></div></Reveal>
        <Reveal><div className="flow-arrow">→</div></Reveal>
        <Reveal><div className="flow-card featured"><span>02</span><b>✦ AI understands</b><p>Category, material, tags and description are suggested.</p></div></Reveal>
        <Reveal><div className="flow-arrow">→</div></Reveal>
        <Reveal><div className="flow-card"><span>03</span><b>🌍 Reach buyers</b><p>Publish a polished listing in minutes.</p></div></Reveal>
      </div>
    </section>

    <section className="section">
      <Reveal><div className="section-head"><div><span className="eyebrow">CURATED</span><h2>Made by real hands.</h2></div></div></Reveal>
      <div className="product-grid">{products.map(p=><ProductCard key={p.id} p={p}/>)}</div>
    </section>

    <section className="artisan-section section">
      <Reveal><div className="section-head"><div><span className="eyebrow">MEET THE MAKERS</span><h2>People behind the craft.</h2></div></div></Reveal>
      <div className="artisan-grid">{artisans.map(a=><Reveal key={a.id}><Link to={`/artisan/${a.id}`} className="artisan-card">
        <img src={a.image} alt={a.name}/><div><span>{a.region}</span><h3>{a.name}</h3><p>{a.craft}</p></div>
      </Link></Reveal>)}</div>
    </section>

    <section className="impact">
      <div><span className="eyebrow">ONE PURCHASE. MANY RIPPLE EFFECTS.</span><h2>Keep craft alive<br/><em>by choosing it.</em></h2></div>
      <div className="impact-stats"><div><b>1</b><span>Artisan supported</span></div><div><b>1</b><span>Craft story carried forward</span></div><div><b>∞</b><span>Possibilities ahead</span></div></div>
    </section>

    <section className="cta section"><div><span className="eyebrow">YOUR NEXT DISCOVERY</span><h2>Find something<br/><em>made with meaning.</em></h2><Link className="btn primary" to="/explore">Enter Kalaudaan <ArrowRight size={18}/></Link></div></section>
  </main>
}
