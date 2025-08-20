# Canteen Angular Frontend

This is the Angular frontend for the Canteen Management System. It consumes the Spring Boot backend at `http://localhost:8080` via a proxy.

## Prerequisites
- Node.js 18+ and npm
- Angular CLI (install with: `npm i -g @angular/cli`)

## Setup
1. Open a terminal in the `frontend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server (with backend proxy):
   ```bash
   npm start
   ```
4. Open the app at `http://localhost:4200/`.

## Notes
- The dev server proxies `/api` to `http://localhost:8080` as configured in `proxy.conf.json`.
- Endpoints used:
  - `GET /api/canteen/menu`
  - `POST /api/canteen/menu`
  - `POST /api/canteen/order`
  - `GET /api/canteen/orders`
