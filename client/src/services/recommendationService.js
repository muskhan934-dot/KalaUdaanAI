const normalize = (value = "") => String(value)
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[₹$€£]/g, " ")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .replace(/\s+/g, " ")
  .trim();

const STOPWORDS = new Set(["the", "a", "an", "and", "for", "with", "in", "of", "to", "from", "inspired", "traditional", "heritage", "handmade", "hand", "artisan", "story", "craft", "made"]);
const tokens = (value = "", keepStopwords = false) => normalize(value).split(" ").filter((word) => word && (keepStopwords || !STOPWORDS.has(word)));

const aliases = {
  saree: ["saree", "sari", "చీర", "साड़ी"],
  handloom: ["handloom", "loom", "weaving", "చేనేత", "हथकरघा"],
  pochampally: ["pochampally", "pochampalli", "ikat", "పోచంపల్లి", "पोचमपल्ली"],
  gadwal: ["gadwal", "గద్వాల్", "गडवाल"],
  mangalagiri: ["mangalagiri", "మంగళగిరి", "मंगलागिरी"],
  kalamkari: ["kalamkari", "కలంకారి", "कलमकारी"],
  pottery: ["pottery", "terracotta", "కుండలు", "మట్టి", "मिट्टी", "टेराकोटा"],
  jewellery: ["jewellery", "jewelry", "necklace", "ఆభరణాలు", "आभूषण"],
  wood: ["wood", "woodcraft", "carving", "చెక్క", "लकड़ी"],
  embroidery: ["embroidery", "needlework", "ఎంబ్రాయిడరీ", "कढ़ाई"],
  textile: ["textile", "fabric", "వస్త్రం", "कपड़ा"],
  brass: ["brass", "ఇత్తడి", "पीतल"],
  cotton: ["cotton", "పత్తి", "सूती"],
  wedding: ["wedding", "weddings", "marriage", "పెళ్లి", "विवाह", "शादी"],
  festival: ["festival", "festivals", "పండుగ", "त्योहार"],
  gift: ["gift", "gifts", "బహుమతి", "उपहार"],
  traditional: ["traditional", "సంప్రదాయ", "पारंपरिक"]
};

const expandAliases = (term) => aliases[term] || [term];

function levenshtein(a, b) {
  if (!a || !b) return Math.max(a?.length || 0, b?.length || 0);
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 0; i < a.length; i += 1) {
    const next = [i + 1];
    for (let j = 0; j < b.length; j += 1) {
      next.push(Math.min(next[j] + 1, prev[j + 1] + 1, prev[j] + (a[i] === b[j] ? 0 : 1)));
    }
    for (let j = 0; j < next.length; j += 1) prev[j] = next[j];
  }
  return prev[b.length];
}

function fuzzyTokenMatch(queryToken, hayTokens) {
  if (!queryToken || queryToken.length < 3) return false;
  return hayTokens.some((word) => {
    if (word === queryToken || word.includes(queryToken) || queryToken.includes(word)) return true;
    const distance = levenshtein(queryToken, word);
    return distance <= Math.max(1, Math.floor(queryToken.length * 0.25));
  });
}

function productText(product = {}) {
  const title = product.title || product.name || {};
  const titleValues = typeof title === "object" ? Object.values(title) : [title];
  const fields = [
    ...titleValues,
    product.name,
    product.craft,
    product.region,
    product.material,
    ...(product.tags || []),
    ...(product.colors || []),
    ...(product.occasion || [])
  ];
  return fields.filter(Boolean).join(" ");
}

function titleValues(product = {}) {
  const title = product.title || product.name || "";
  return typeof title === "object" ? Object.values(title) : [title];
}

export function parseBuyerRequest(query = "") {
  const q = normalize(query);
  const budgetMatch = q.match(/(?:under|below|less than|within|upto|up to|లోపు|तक)\s*\s*([\d,]+)/i);
  const budget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : null;
  const findAlias = (keys) => keys.find((key) => expandAliases(key).some((a) => q.includes(normalize(a)))) || null;
  return {
    budget,
    occasion: findAlias(["wedding", "festival", "gift", "traditional"]),
    material: findAlias(["cotton", "brass", "terracotta", "wood", "silk"]),
    craft: findAlias(["saree", "handloom", "pochampally", "gadwal", "mangalagiri", "kalamkari", "pottery", "jewellery", "wood", "embroidery"]),
    color: findAlias(["blue", "red", "maroon", "gold", "cream", "indigo", "magenta"])
  };
}

export function recommendProducts(products, query = "", activity = {}) {
  const source = Array.isArray(products) ? products : [];
  const cleanQuery = normalize(query);
  const queryTokens = tokens(query);
  const parsed = parseBuyerRequest(query);
  const wishlist = activity.wishlist || [];
  const viewed = activity.viewed || [];

  if (!cleanQuery) {
    return source
      .slice()
      .sort((a, b) => (wishlist.includes(b.id) ? 1 : 0) - (wishlist.includes(a.id) ? 1 : 0) || Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 4);
  }

  const ranked = source.map((p) => {
    const haystack = normalize(productText(p));
    const hayTokens = tokens(productText(p));
    let score = 0;
    let directName = false;

    // Product-name matching is deliberately weighted highest. This fixes queries
    // such as "Pochampally Inspired Ikat" or just "Pochampally".
    for (const value of titleValues(p)) {
      const title = normalize(value);
      if (title === cleanQuery) { score += 100; directName = true; }
      else if (title.includes(cleanQuery)) { score += 70; directName = true; }
      else {
        const titleTokens = tokens(value);
        const overlap = queryTokens.filter((qt) => titleTokens.some((tt) => fuzzyTokenMatch(qt, [tt]))).length;
        if (overlap) score += overlap * 18;
      }
    }

    const hayAliases = Object.entries(aliases);
    for (const [key, values] of hayAliases) {
      if (queryTokens.some((qt) => values.some((v) => normalize(v) === qt)) && haystack.includes(normalize(key))) score += 12;
    }

    if (parsed.budget) score += p.price <= parsed.budget ? 18 : -8;
    if (parsed.occasion && (p.occasion || []).some((o) => expandAliases(parsed.occasion).some((a) => normalize(o).includes(normalize(a))))) score += 15;
    if (parsed.material && haystack.includes(normalize(parsed.material))) score += 14;
    if (parsed.craft && expandAliases(parsed.craft).some((a) => haystack.includes(normalize(a)))) score += 16;
    if (parsed.color && haystack.includes(normalize(parsed.color))) score += 8;
    if (wishlist.includes(p.id)) score += 5;
    if (viewed.includes(p.id)) score += 3;
    if (queryTokens.every((qt) => fuzzyTokenMatch(qt, hayTokens))) score += 10;

    return { product: p, score, directName };
  }).sort((a, b) => b.score - a.score || Number(b.product.rating || 0) - Number(a.product.rating || 0) || Number(a.product.price || 0) - Number(b.product.price || 0));

  const relevant = ranked.filter((x) => x.score >= 12);
  if (relevant.length) {
    // If the user named one exact product, show it first and then closely related
    // products instead of unrelated catalogue items.
    const exact = relevant.filter((x) => x.directName);
    const base = exact.length ? exact : relevant;
    const primary = base.slice(0, 4).map((x) => x.product);
    if (primary.length >= 4) return primary;
    const related = relevant.filter((x) => !primary.some((p) => p.id === x.product.id)).slice(0, 4 - primary.length).map((x) => x.product);
    return [...primary, ...related];
  }

  // Never return unrelated first-page products for a specific query.
  return [];
}

export function visualMatch(products, filename = "") {
  const q = normalize(filename);
  if (!q) return [];
  return (products || []).map((p) => ({ p, score: tokens(productText(p)).filter((w) => fuzzyTokenMatch(w, tokens(q))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.p);
}
