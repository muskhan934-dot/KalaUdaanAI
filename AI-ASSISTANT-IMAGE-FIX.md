# KalaUdaan AI — Assistant + Product Image Fix

## Fixed

### AI Buyer Assistant
- Product-name matching now has highest priority.
- Matches all localized product titles (English/Telugu/Hindi).
- Matches craft, region, material, colors, tags and occasions.
- Supports common spelling variations and fuzzy matching.
- Understands queries such as:
  - `Pochampally`
  - `Pochampally Inspired Ikat`
  - `Terracotta Heritage Vase`
  - `Kalamkari Story Panel`
  - `cotton under ₹2000 for a wedding`
- Removed the old behavior that returned unrelated first-page products when a specific query had no match.
- Shows a clear no-match state instead of misleading recommendations.

### Product imagery
The six demo catalogue products now use local, offline-safe traditional village/craft artwork:
- Terracotta / Andhra village pottery
- Pochampally / Telangana handloom
- Rajasthan wood carving
- Gujarat artisan jewellery
- Andhra Kalamkari
- Karnataka hand embroidery

The existing dark cinematic KalaUdaan AI UI is unchanged. Only catalogue product imagery was changed.

### Image reliability
- Product cards now fall back safely if an image fails.
- AI assistant mini-product images also have a safe fallback.
- Product images no longer depend on Unsplash/network availability.

## Verification
The recommendation service was executed directly with representative product-name queries and returned the expected product IDs.
Locale JSON files were parsed successfully.

`npm install` / `npm run build` could not be completed in this environment because the npm registry was not reachable and Vite was not installed locally. No claim of a completed production build is made.
