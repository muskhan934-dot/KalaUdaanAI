import { artisanData } from "../data/catalog";
export function getArtisan(id) { return artisanData.find((a) => a.id === id) || artisanData[0]; }
