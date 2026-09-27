const languageNames = { en: "English", te: "Telugu", hi: "Hindi" };

const craftProfiles = {
  "Pochampally Ikat": { material: "Cotton", region: "Telangana", title: { en: "Pochampally Ikat Handloom Saree", te: "పోచంపల్లి ఇకట్ చేనేత చీర", hi: "पोचमपल्ली इकत हथकरघा साड़ी" }, description: { en: "A richly patterned handloom textile inspired by the geometric rhythm of Pochampally Ikat weaving.", te: "పోచంపల్లి ఇకట్ జ్యామితీయ నమూనాల ప్రేరణతో రూపొందించిన రంగురంగుల చేనేత వస్త్రం.", hi: "पोचमपल्ली इकत की ज्यामितीय लय से प्रेरित समृद्ध हथकरघा वस्त्र।" }, tags: ["pochampally", "ikat", "handloom", "cotton", "saree"], keywords: ["Pochampally", "Ikat", "handloom saree", "Telangana", "cotton"], occasions: ["Weddings", "Festivals", "Traditional"] },
  "Terracotta": { material: "Terracotta", region: "Andhra Pradesh", title: { en: "Hand-Painted Terracotta Village Vase", te: "చేతితో చిత్రించిన టెర్రాకోట గ్రామీణ కుండ", hi: "हाथ से चित्रित टेराकोटा ग्राम्य फूलदान" }, description: { en: "A hand-painted terracotta vessel with folk motifs, warm earth tones and a village-made character.", te: "జానపద నమూనాలు, మట్టి రంగులతో గ్రామీణ శైలిలో చేతితో చిత్రించిన టెర్రాకోట పాత్ర.", hi: "लोक आकृतियों और मिट्टी के रंगों से हाथ से चित्रित टेराकोटा पात्र।" }, tags: ["terracotta", "pottery", "folk-art", "village-craft"], keywords: ["terracotta vase", "pottery", "folk art", "Andhra Pradesh"], occasions: ["Home Decor", "Gifts", "Traditional"] },
  "Jewellery": { material: "Brass", region: "Gujarat", title: { en: "Traditional Temple Jewellery Necklace", te: "సంప్రదాయ టెంపుల్ ఆభరణాల హారం", hi: "पारंपरिक मंदिर आभूषण हार" }, description: { en: "A handcrafted necklace inspired by Indian temple jewellery, with red accents and antique-gold details.", te: "ఎరుపు రాళ్లు, పురాతన బంగారు వివరాలతో భారతీయ టెంపుల్ ఆభరణాల ప్రేరణతో చేతితో తయారు చేసిన హారం.", hi: "लाल रंग के पत्थरों और एंटीक गोल्ड विवरण वाला मंदिर आभूषण प्रेरित हस्तनिर्मित हार।" }, tags: ["jewellery", "necklace", "brass", "temple-jewellery"], keywords: ["temple jewellery", "necklace", "brass", "Gujarat"], occasions: ["Weddings", "Gifts", "Traditional"] },
  "Basket Weaving": { material: "Natural Fibre", region: "Kerala", title: { en: "Handwoven Village Basket", te: "చేతితో అల్లిన గ్రామీణ బుట్ట", hi: "हाथ से बुनी ग्राम्य टोकरी" }, description: { en: "A natural-fibre basket woven by hand for storage, serving and village-inspired home decor.", te: "సహజ నారలతో చేతితో అల్లిన బహుళ ఉపయోగాల గ్రామీణ శైలి బుట్ట.", hi: "प्राकृतिक रेशों से हाथ से बुनी बहुउपयोगी ग्राम्य टोकरी।" }, tags: ["basket", "weaving", "natural-fibre", "village-craft"], keywords: ["handwoven basket", "natural fibre", "village craft", "Kerala"], occasions: ["Home Decor", "Gifts", "Traditional"] },
  "Kalamkari": { material: "Cotton", region: "Andhra Pradesh", title: { en: "Kalamkari Story Textile Panel", te: "కలంకారి కథా వస్త్ర ప్యానెల్", hi: "कलमकारी कथा वस्त्र पैनल" }, description: { en: "A Kalamkari-style textile panel using botanical and folk-inspired storytelling motifs.", te: "వృక్ష, జానపద నమూనాలతో కథ చెప్పే కలంకారి శైలి వస్త్ర ప్యానెల్.", hi: "वनस्पति और लोक रूपांकनों से कहानी कहता कलमकारी शैली का वस्त्र पैनल।" }, tags: ["kalamkari", "painting", "textile", "story-art"], keywords: ["Kalamkari", "story textile", "cotton", "Andhra Pradesh"], occasions: ["Home Decor", "Gifts"] },
  "Embroidery": { material: "Cotton", region: "Karnataka", title: { en: "Hand Embroidered Heritage Textile", te: "చేతి ఎంబ్రాయిడరీ వారసత్వ వస్త్రం", hi: "हाथ की कढ़ाई वाला विरासत वस्त्र" }, description: { en: "Detailed needlework that brings texture and a quiet handmade character to every thread.", te: "ప్రతి దారంలో నైపుణ్యాన్ని చూపించే అందమైన చేతి ఎంబ్రాయిడరీ వస్త్రం.", hi: "हर धागे में बारीक कारीगरी दिखाने वाला हस्तकढ़ाई विरासत वस्त्र।" }, tags: ["embroidery", "textile", "handmade"], keywords: ["hand embroidery", "heritage textile", "Karnataka"], occasions: ["Weddings", "Traditional"] },
  "Wood Carving": { material: "Sheesham Wood", region: "Rajasthan", title: { en: "Hand-Carved Wooden Heritage Panel", te: "చేతితో చెక్కిన చెక్క వారసత్వ ప్యానెల్", hi: "हाथ से नक्काशीदार लकड़ी विरासत पैनल" }, description: { en: "A warm wooden decor piece inspired by traditional Indian carving motifs.", te: "భారతీయ సంప్రదాయ చెక్క నమూనాల ప్రేరణతో తయారైన చెక్క అలంకరణ ప్యానెల్.", hi: "भारतीय पारंपरिक नक्काशी से प्रेरित लकड़ी का सजावटी पैनल।" }, tags: ["wood", "carving", "decor"], keywords: ["wood carving", "heritage decor", "Rajasthan"], occasions: ["Gifts", "Home Decor"] },
  "Metal Craft": { material: "Brass", region: "Gujarat", title: { en: "Traditional Brass Craft Bowl", te: "సంప్రదాయ ఇత్తడి కళా గిన్నె", hi: "पारंपरिक पीतल शिल्प कटोरा" }, description: { en: "A simple handcrafted brass form inspired by inherited metalworking traditions.", te: "తరతరాలుగా వచ్చిన లోహ కళా సంప్రదాయాల ప్రేరణతో తయారైన ఇత్తడి కళా వస్తువు.", hi: "पीढ़ियों से चली आ रही धातु-कला परंपरा से प्रेरित हस्तनिर्मित पीतल वस्तु।" }, tags: ["metal", "brass", "handmade"], keywords: ["brass craft", "metal craft", "Gujarat"], occasions: ["Gifts", "Home Decor", "Traditional"] }
};

export function generateProductDetails(input = {}, lang = "en") {
  const craft = input.craft || "Handloom";
  const profile = craftProfiles[craft] || craftProfiles["Pochampally Ikat"];
  const material = input.material || profile.material;
  const region = input.region || profile.region;
  const price = Number(input.price || 0);
  const colors = input.colors || "Earth, Indigo, Gold";
  const suggested = price > 0 ? [Math.max(499, Math.round(price * 0.95)), Math.round(price * 1.15)] : [1299, 2199];
  return {
    title: profile.title?.[lang] || profile.title?.en || `Traditional ${region} ${material} ${craft}`,
    description: profile.description?.[lang] || profile.description?.en || `A handcrafted ${material.toLowerCase()} creation from ${region}, made using traditional ${craft.toLowerCase()} techniques.`,
    category: craft,
    materials: material,
    colors,
    tags: profile.tags,
    keywords: profile.keywords,
    suggestedRange: `₹${suggested[0].toLocaleString("en-IN")} – ₹${suggested[1].toLocaleString("en-IN")}`,
    occasions: profile.occasions
  };
}

export function generateTags(input) { return [input.craft, input.material, input.region, "handmade", "traditional", "artisan"].filter(Boolean); }
export function suggestPrice({ materialCost = 0, labourCost = 0, productionTime = 1, complexity = "medium", category = "Handloom", existingPrice = 0 }) {
  const complexityFactor = { low: 1, medium: 1.12, high: 1.28 }[complexity] || 1.12;
  const productionCost = Number(materialCost) + Number(labourCost) + Math.max(0, Number(productionTime)) * 35;
  const base = Math.max(productionCost * complexityFactor, Number(existingPrice) || 0);
  return { productionCost: Math.round(productionCost), minimum: Math.round(base * 1.18 / 10) * 10, recommended: Math.round(base * 1.45 / 10) * 10, premium: Math.round(base * 1.8 / 10) * 10, category };
}

export function translateContent(text, from, to) {
  if (!text || from === to) return text;
  if (from === "en" && to === "te") return text.replace(/cotton/gi, "కాటన్").replace(/saree/gi, "చీర").replace(/price/gi, "ధర");
  if (from === "en" && to === "hi") return text.replace(/cotton/gi, "कॉटन").replace(/saree/gi, "साड़ी").replace(/price/gi, "कीमत");
  return text;
}

export function detectVoiceProduct(text = "") {
  const q = text.toLowerCase();
  const craft = /pochamp|ikat|saree|sari|చీర|पोचम/.test(q) ? "Pochampally Ikat" : /kalamkari|కలంకారి|कलमकारी/.test(q) ? "Kalamkari" : /basket|బుట్ట|टोकरी/.test(q) ? "Basket Weaving" : /necklace|jewell|ఆభరణ|आभूषण/.test(q) ? "Jewellery" : /terracotta|pottery|vase|మట్టి|मिट्टी/.test(q) ? "Terracotta" : /wood|చెక్క|लकड़ी/.test(q) ? "Wood Carving" : /brass|metal|ఇత్తడి|पीतल/.test(q) ? "Metal Craft" : "Handloom";
  const material = /cotton|కాటన్|पత్తి|कॉटन/.test(q) ? "Cotton" : craft === "Terracotta" ? "Terracotta" : craft === "Jewellery" || craft === "Metal Craft" ? "Brass" : craft === "Basket Weaving" ? "Natural Fibre" : "Handmade";
  const priceMatch = q.match(/(?:price|ధర|कीमत)\s*(?:is|:)?\s*₹?\s*([\d,]+)/) || q.match(/([\d,]+)\s*(?:rupees|రూపాయలు|रुपये)/);
  return { craft, material, price: priceMatch ? Number(priceMatch[1].replace(/,/g, "")) : "", language: /[అ-హ]/.test(text) ? "Telugu" : /[ऀ-ॿ]/.test(text) ? "Hindi" : "English", raw: text };
}

export function languageName(lang) { return languageNames[lang] || "English"; }

export function screenSellerVerification(input = {}) {
  const checks = [
    { key: "name", label: "sellerNameCheck", pass: Boolean(input.name?.trim()) },
    { key: "craft", label: "craftCheck", pass: Boolean(input.craft?.trim()) },
    { key: "region", label: "regionCheck", pass: Boolean(input.region?.trim()) },
    { key: "experience", label: "experienceCheck", pass: Number(input.experience) >= 1 },
    { key: "document", label: "documentCheck", pass: Boolean(input.documentName) }
  ];
  const passed = checks.filter((c) => c.pass).length;
  const qualified = passed === checks.length;
  return { qualified, score: Math.round((passed / checks.length) * 100), checks, message: qualified ? "Screening complete. You can publish products." : "Complete the remaining verification checks before publishing." };
}
