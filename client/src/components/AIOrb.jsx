import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
export default function AIOrb(){
  return <motion.div className="ai-orb" animate={{y:[0,-10,0], rotate:[0,4,-4,0]}} transition={{duration:5,repeat:Infinity}}>
    <span className="orb-ring ring1"/><span className="orb-ring ring2"/>
    <div><Sparkles size={38}/></div>
  </motion.div>
}
