const CRAFT_HINTS = [
  { keys: ["saree", "sari", "pochamp", "ikat", "handloom", "textile", "weave"], craft: "Pochampally Ikat", material: "Cotton", region: "Telangana" },
  { keys: ["kalamkari"], craft: "Kalamkari", material: "Cotton", region: "Andhra Pradesh" },
  { keys: ["vase", "pottery", "terracotta", "clay", "matka"], craft: "Terracotta", material: "Terracotta", region: "Andhra Pradesh" },
  { keys: ["necklace", "jewellery", "jewelry", "earring", "bangle", "ornament"], craft: "Jewellery", material: "Brass", region: "Gujarat" },
  { keys: ["basket", "bamboo", "cane", "wicker"], craft: "Basket Weaving", material: "Natural Fibre", region: "Kerala" },
  { keys: ["wood", "carving", "woodcraft"], craft: "Wood Carving", material: "Sheesham Wood", region: "Rajasthan" },
  { keys: ["metal", "brass", "bronze", "bell", "dokra"], craft: "Metal Craft", material: "Brass", region: "Gujarat" },
  { keys: ["embroidery", "thread", "needle", "stitch"], craft: "Embroidery", material: "Cotton", region: "Karnataka" }
];

function colorName(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max < 60) return "Charcoal";
  if (max - min < 22) return max > 190 ? "Cream" : "Earth";
  if (r > g * 1.35 && r > b * 1.3) return r > 170 ? "Rust" : "Maroon";
  if (g > r * 1.15 && g > b * 1.05) return "Green";
  if (b > r * 1.2 && b > g * 1.05) return "Indigo";
  if (r > 150 && b > 100 && g < 125) return "Magenta";
  if (r > 145 && g > 105 && b < 95) return "Gold";
  return "Earth";
}

function classifyPixels(stats) {
  const { red, green, blue, warm, neutral, dark, bright, saturation, aspectRatio } = stats;
  // These are transparent offline heuristics, not a claim of clinical/industrial AI vision.
  if (neutral > 0.45 && warm > 0.18 && saturation < 0.36) return { craft: "Basket Weaving", material: "Natural Fibre", region: "Kerala", confidence: "visual colour/texture profile" };
  if (dark > 0.45 && red > 0.25 && bright < 0.20) return { craft: "Jewellery", material: "Brass", region: "Gujarat", confidence: "visual jewellery profile" };
  if (blue > 0.12 && red > 0.12 && aspectRatio > 0.78 && aspectRatio < 1.35) return { craft: "Terracotta", material: "Terracotta", region: "Andhra Pradesh", confidence: "visual colour/shape profile" };
  if (red > 0.42 && bright > 0.25 && aspectRatio > 1.15) return { craft: "Pochampally Ikat", material: "Cotton", region: "Telangana", confidence: "visual textile profile" };
  if (green > 0.12 && red > 0.18 && saturation > 0.22) return { craft: "Kalamkari", material: "Cotton", region: "Andhra Pradesh", confidence: "visual colour profile" };
  return null;
}

export async function analyzeProductImage(file, dataUrl) {
  const name = String(file?.name || "").toLowerCase();
  const hint = CRAFT_HINTS.find((item) => item.keys.some((key) => name.includes(key)));
  const result = {
    source: "local-visual-analysis",
    filename: file?.name || "uploaded-image",
    type: file?.type || "image/*",
    size: Number(file?.size || 0),
    width: 0, height: 0, aspectRatio: 1,
    dominantColor: "Earth",
    craft: hint?.craft || "Handloom",
    material: hint?.material || "Cotton",
    region: hint?.region || "Telangana",
    confidence: hint ? "filename + image pixels" : "image pixels + visual heuristics",
    visualFeatures: { red: 0, green: 0, blue: 0, warm: 0, neutral: 0, dark: 0, bright: 0, saturation: 0 }
  };
  if (!dataUrl) return result;

  await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      result.width = img.naturalWidth || 0;
      result.height = img.naturalHeight || 0;
      result.aspectRatio = result.height ? result.width / result.height : 1;
      try {
        const size = 96;
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve();
        ctx.drawImage(img, 0, 0, size, size);
        const pixels = ctx.getImageData(0, 0, size, size).data;
        let r=0,g=0,b=0,count=0, red=0,green=0,blue=0,warm=0,neutral=0,dark=0,bright=0,sat=0;
        for (let i=0;i<pixels.length;i+=16) {
          if (pixels[i+3] < 30) continue;
          const rr=pixels[i], gg=pixels[i+1], bb=pixels[i+2];
          r+=rr; g+=gg; b+=bb; count++;
          const mx=Math.max(rr,gg,bb), mn=Math.min(rr,gg,bb);
          if (rr > gg*1.25 && rr > bb*1.18) red++;
          if (gg > rr*1.12 && gg > bb*1.05) green++;
          if (bb > rr*1.18 && bb > gg*1.05) blue++;
          if (rr > 125 && gg > 80 && bb < 120) warm++;
          if (mx-mn < 35) neutral++;
          if (mx < 75) dark++;
          if (mx > 185) bright++;
          sat += mx ? (mx-mn)/mx : 0;
        }
        if (count) {
          result.dominantColor = colorName(Math.round(r/count), Math.round(g/count), Math.round(b/count));
          result.visualFeatures = { red:red/count, green:green/count, blue:blue/count, warm:warm/count, neutral:neutral/count, dark:dark/count, bright:bright/count, saturation:sat/count };
          if (!hint) {
            const classified = classifyPixels({ ...result.visualFeatures, aspectRatio: result.aspectRatio });
            if (classified) Object.assign(result, classified);
          }
        }
      } catch {}
      resolve();
    };
    img.onerror = () => resolve();
    img.src = dataUrl;
  });
  return result;
}
