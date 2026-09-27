import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function Login(){
 const nav=useNavigate();
 return <main className="auth-page"><motion.div className="auth-card" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}>
   <span className="eyebrow">WELCOME TO KALAUDAAN</span><h1>Enter the craft universe.</h1>
   <p>Sign in to discover crafts or manage your artisan store.</p>
   <input placeholder="Full name"/><input placeholder="Phone number"/><input placeholder="Email address"/>
   <button className="btn primary full" onClick={()=>nav("/role")}>Continue</button>
   <small>By continuing, you agree to Kalaudaan's terms and privacy policy.</small>
 </motion.div></main>
}
