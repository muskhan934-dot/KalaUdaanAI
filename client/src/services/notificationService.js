import { readJSON, writeJSON } from "../utils/storage";
const KEY = "kalaudaan-notifications";
export function getNotifications() { return readJSON(KEY, [
  { id: "n1", kind: "order", title: { en: "New order", te: "కొత్త ఆర్డర్", hi: "नया ऑर्डर" }, text: { en: "Your handloom product has a new buyer enquiry.", te: "మీ చేనేత ఉత్పత్తికి కొత్త కొనుగోలుదారు విచారణ వచ్చింది.", hi: "आपके हथकरघा उत्पाद के लिए नई खरीदार पूछताछ आई है।" }, time: "2h" },
  { id: "n2", kind: "ai", title: { en: "AI recommendation", te: "AI సూచన", hi: "AI सुझाव" }, text: { en: "Complete product descriptions can improve discovery.", te: "పూర్తి ఉత్పత్తి వివరణలు కనుగొనడాన్ని మెరుగుపరచవచ్చు.", hi: "पूरे उत्पाद विवरण खोज को बेहतर कर सकते हैं।" }, time: "1d" }
]); }
export function markNotificationsSeen() { const next = getNotifications().map((n) => ({ ...n, seen: true })); writeJSON(KEY, next); return next; }
