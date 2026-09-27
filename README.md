# KalaUdaan AI — Cinematic Heritage Marketplace

This project is an extension/refactor of the existing KalaUdaan React prototype. Existing localStorage keys for products, wishlist and cart are preserved.

## Run

### Frontend
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally http://localhost:5173).

### Optional demo server
```bash
cd server
npm install
npm run dev
```

The frontend works without an API key and does not require the server for the local AI prototype features.

## Main routes
- `/` cinematic editorial homepage
- `/explore` marketplace + search + voice/image search + occasion filters
- `/artisans` artisan directory
- `/heritage` region explorer
- `/stories` stories
- `/impact` impact dashboard
- `/wishlist` persistent wishlist
- `/cart` persistent cart
- `/orders` buyer orders
- `/seller` seller dashboard
- `/seller/products` seller catalog
- `/seller/product-studio` AI Product Studio + voice-to-sell + gallery/camera
- `/seller/orders` order status workflow
- `/seller/inventory` inventory
- `/seller/photo-studio` safe photo preview controls
- `/seller/analytics` analytics demo
- `/seller/verification` platform verification

## Notes
- English, Telugu and Hindi are provided through JSON locale files and switch without a reload.
- AI features are clearly local/mock services. No fake external AI API is claimed.
- Price suggestions are estimates; the artisan controls the final price.
- Impact and analytics numbers are demo/prototype data.
- The supplied KalaUdaan AI logo is stored in `client/public/assets/`.

## Final fixes in this build
See `FINAL-FIXES.md` for the complete functional and image-reliability changes.
