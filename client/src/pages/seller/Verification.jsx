import { useState } from "react";
import { UploadCloud, ShieldCheck, AlertTriangle } from "lucide-react";
export default function Verification(){
 const [done,setDone]=useState(false);
 return <main className="section verify-page"><div className="center-head"><span className="eyebrow">SELLER ONBOARDING · 01</span><h1>Build your artisan identity.</h1><p>Start with AI-assisted document risk screening.</p></div>
 <div className="verify-card">{!done?<><div className="upload-zone"><UploadCloud size={35}/><h2>Upload verification document</h2><p>PDF, JPG or PNG</p><input type="file" onChange={()=>setDone(true)}/></div><div className="notice"><AlertTriangle size={17}/><span>AI screening is a risk signal, not proof of authenticity. Final verification may require human or official checks.</span></div></>:<div className="scan-result"><div className="scan-icon"><ShieldCheck size={35}/></div><span className="eyebrow">AI SCREENING COMPLETE</span><h2>Initial checks passed.</h2><div className="check-list"><span>✓ Image quality acceptable</span><span>✓ Key information detected</span><span>✓ No obvious formatting anomaly detected</span><b>Manual/official verification recommended</b></div><a href="/seller/products/new" className="btn primary">Continue to seller studio</a></div>}</div></main>
}
