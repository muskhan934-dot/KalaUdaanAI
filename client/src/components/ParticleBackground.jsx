import { motion } from "framer-motion";

export default function ParticleBackground(){
  const particles = Array.from({length:28}, (_,i)=>i);
  return <div className="particles" aria-hidden="true">
    {particles.map(i => (
      <motion.span
        key={i}
        className="particle"
        initial={{opacity:0.2}}
        animate={{y:[0,-20,0], x:[0,(i%3-1)*14,0], opacity:[0.2,0.8,0.2]}}
        transition={{duration:4+(i%5), repeat:Infinity, delay:i*.13}}
        style={{left:`${(i*37)%100}%`, top:`${(i*61)%100}%`}}
      />
    ))}
  </div>
}
