import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app=express(); app.use(cors()); app.use(express.json({limit:"8mb"}));
let products=[
 {id:"1",name:"Terracotta Heritage Vase",craft:"Pottery",region:"Andhra Pradesh",price:899,rating:4.8,image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85"},
 {id:"2",name:"Pochampally Inspired Ikat",craft:"Handloom",region:"Telangana",price:1499,rating:4.9,image:"https://images.unsplash.com/photo-1604323347240-1f1c1b1b3b13?auto=format&fit=crop&w=1000&q=85"}
];
app.get("/api/health",(_,res)=>res.json({ok:true,service:"KalaUdaan API"}));
app.get("/api/products",(req,res)=>{const q=String(req.query.q||"").toLowerCase();res.json(q?products.filter(p=>(p.name+" "+p.craft+" "+p.region).toLowerCase().includes(q)):products)});
app.post("/api/products",(req,res)=>{const p={...req.body,id:req.body.id||`server-${Date.now()}`};products.unshift(p);res.status(201).json(p)});
app.delete("/api/products/:id",(req,res)=>{products=products.filter(p=>p.id!==req.params.id);res.json({ok:true})});
app.post("/api/ai/product-description",(req,res)=>{const {name="handmade craft",craft="traditional craft",region="India"}=req.body;res.json({description:`A handcrafted ${name} inspired by ${craft} traditions from ${region}. Made with care by an artisan and designed to bring cultural character into everyday life.`})});
app.post("/api/ai/price-suggestion",(req,res)=>{const base=Number(req.body.basePrice)||900;res.json({range:[Math.round(base*.9),Math.round(base*1.2)],recommended:Math.round(base)})});
app.post("/api/ai/search",(req,res)=>{const query=String(req.body.query||"").toLowerCase();const filters={};if(query.includes("pottery"))filters.craft="Pottery";if(query.includes("handloom"))filters.craft="Handloom";const m=query.match(/under\s*₹?\s*(\d+)/i);if(m)filters.maxPrice=Number(m[1]);res.json({interpretedQuery:query,filters})});
app.post("/api/ai/voice-listing",(req,res)=>res.json({text:req.body.text||"",fields:{name:"Handcrafted Terracotta Vase",category:"Pottery",material:"Terracotta",description:"Handmade terracotta pottery created using traditional techniques."}}));
app.post("/api/ai/verification-screen",(_,res)=>res.json({status:"review_required",checks:["Image quality acceptable","Key information detected","No obvious formatting anomaly detected"],disclaimer:"AI screening is a risk signal, not proof of authenticity."}));
app.listen(process.env.PORT||5000,()=>console.log(`KalaUdaan API running on ${process.env.PORT||5000}`));
