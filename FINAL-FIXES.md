# KalaUdaan AI — Final Functional Fixes

This build preserves the existing dark Indian-heritage visual system and fixes the requested marketplace functionality.

## Included
- Local product imagery only: no Unsplash product/craft/story dependencies.
- Added the four supplied traditional product photos as local assets:
  - hand-painted terracotta vase
  - Pochampally/Ikat saree
  - traditional jewellery necklace
  - handwoven village basket
- Added local Kalamkari, wood-carving and metal-craft artwork for additional cards.
- Updated product names/descriptions to match the traditional images.
- Fixed product image fallbacks.
- Fixed cart/wishlist state normalization and duplicate cart entries.
- AI Buyer Assistant returns up to four relevant products and prioritizes exact product-name matches.
- Image search now analyzes the uploaded image locally and uses the detected craft as the search query.
- AI Product Studio keeps fields blank until Generate Product is clicked, then uses image-specific visual heuristics + craft profiles to generate different product information.
- Seller verification remains a hard gate: Publish is disabled until all verification checks pass.
- AI Photo Studio keeps the original image visible, provides editing controls and both original/improved "Use in Product Studio" actions.
- Added working voice capture on Artisans and Seller Dashboard; Seller Dashboard voice notes flow into Product Studio.
- Stories View/Watch/Listen buttons now open a working story reader modal.
- Added structured Help and Contact pages.
- Added Terms and Privacy pages with original marketplace-oriented content.
- Added seller Enquiries and Market Opportunities dashboards.
- Preserved English/Telugu/Hindi localization for the new pages and features.

## Run

```bash
cd client
npm install
npm run dev
```

The project uses Vite + React. No API key is required for the local prototype.

## Production note
The AI analysis is a transparent local prototype based on image pixels, filenames and craft profiles. It should not be represented as a real cloud vision model until a production AI service is integrated.
