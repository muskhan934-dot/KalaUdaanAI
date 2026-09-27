# Kalaudaan API

Endpoints:
GET  /api/health
GET  /api/products?q=pottery
POST /api/ai/product-description
POST /api/ai/price-suggestion
POST /api/ai/search
POST /api/ai/voice-listing
POST /api/ai/verification-screen

For production:
- Add MongoDB models/repositories.
- Add JWT/session authentication.
- Add object storage for images/documents.
- Put the AI provider call inside server/services/aiService.js.
- Add rate limiting, validation, logging, authorization and audit trails.
