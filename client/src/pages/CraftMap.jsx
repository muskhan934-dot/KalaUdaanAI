import { useState } from "react";
import { MapPin } from "lucide-react";

const regions = {
  Telangana: ["Pochampally Ikat", "Cheriyal painting", "Handloom"],
  "Andhra Pradesh": ["Terracotta pottery", "Kalamkari", "Wood craft"],
  Rajasthan: ["Blue pottery", "Wood carving", "Block printing"],
  Gujarat: ["Bandhani", "Embroidery", "Jewellery"],
  Odisha: ["Pattachitra", "Silver filigree", "Palm-leaf craft"]
};

export default function CraftMap() {
  const [region, setRegion] = useState("Telangana");
  const crafts = regions[region] || [];

  return (
    <main className="section map-page">
      <div className="center-head">
        <span className="eyebrow">EXPLORE INDIA</span>
        <h1>Every region has a story.</h1>
        <p>Choose a region to uncover the crafts rooted there.</p>
      </div>
      <div className="map-layout">
        <div className="india-map">
          <div className="map-word">INDIA</div>
          {Object.keys(regions).map((name, index) => (
            <button
              key={name}
              type="button"
              className={`map-pin pin-${index}`}
              onClick={() => setRegion(name)}
              aria-label={`Select ${name}`}
            >
              <MapPin size={17} />
              <span>{name}</span>
            </button>
          ))}
        </div>
        <div className="region-panel">
          <span className="eyebrow">SELECTED REGION</span>
          <h2>{region}</h2>
          <p>Craft traditions connected to this region.</p>
          {crafts.map((craft) => (
            <div className="region-item" key={craft}>
              <b>{craft}</b>
              <span>Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
