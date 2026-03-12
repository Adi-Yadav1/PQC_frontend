# PQC Blockchain Wallet - Frontend

A production-style React frontend for the Post-Quantum Secure Blockchain Wallet Platform. Built with React, Vite, React Router, Axios, and Recharts.

## Features

- Multi-page product navigation with protected routes
- Home, Dashboard, Explorer, Transactions, Network, Demo Control, Metrics, and Cryptography pages
- Public and private transaction support (ML-KEM encrypted payload path)
- Blockchain verification and live operational visibility
- Responsive cybersecurity dashboard styling with subtle animation

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Metrics visualizations
- **Modern CSS** - Dark theme with custom properties

## Project Structure

```
src/
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Explorer.jsx
│   ├── TransactionHistory.jsx
│   ├── Network.jsx
│   ├── DemoControl.jsx
│   ├── Metrics.jsx
│   ├── CryptographyInfo.jsx
│   ├── QuantumThreat.jsx
│   ├── Wallet.jsx
│   ├── BlockDetails.jsx
│   └── Search.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Card.jsx
│   ├── Table.jsx
│   ├── LoadingSpinner.jsx
│   ├── StatusBadge.jsx
│   ├── QuantumAttackDiagram.jsx
│   ├── NetworkGraph.jsx
│   ├── RevealSection.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   └── BlockchainContext.jsx
├── hooks/
│   └── useRevealOnScroll.js
├── services/
│   └── api.js
└── styles/
    ├── index.css          # Global styles
    ├── components.css     # Component styles
    └── pages.css          # Page-specific styles
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The application will open at http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Integration

The frontend connects to the backend API using VITE_API_BASE_URL.

### Available Endpoints

**Authentication:**
- `POST /login` - Login user
- `POST /register` - Register new user
- `GET /profile/<user_id>` - Get user profile

**Blockchain:**
- `POST /send_transaction`
- `POST /private_transaction`
- `POST /mine`
- `GET /chain`
- `GET /blocks`
- `GET /transactions/<wallet_address>`
- `GET /balance/<wallet_address>`
- `GET /verify`
- `GET /node_info`
- `GET /network`
- `GET /network_metrics`
- `GET /crypto_info`
- `POST /reset_network`
- `POST /simulate_transactions`
- `POST /mine_now`
- `POST /run_demo`

## Authentication Flow

1. User registers at `/register` or logs in at `/login`
2. Credentials are sent to backend API
3. Token and user info are stored in `localStorage`
4. Token is automatically included in all API requests
5. Protected routes redirect unauthenticated users to login

## Dark Theme

The application uses CSS custom properties for theming. All colors are defined in `src/styles/index.css` under `:root`:

```css
--primary: #6366f1
--bg-dark: #0f172a
--text-primary: #f1f5f9
```

## Features in Detail

## Route Map

- / (Home)
- /login
- /register
- /dashboard
- /explorer and /blockchain-explorer
- /transactions
- /network
- /demo-control
- /metrics
- /cryptography-info
- /quantum-threat

## Environment Variable

- VITE_API_BASE_URL
   - Example: https://your-backend.onrender.com

If omitted, the app defaults to http://127.0.0.1:5000.

## Production Hardening Summary

- Route-level code splitting enabled via `React.lazy` + `Suspense`
- Global route `ErrorBoundary` added to prevent full app crash
- Centralized API error handling for `401`, network failures, and `5xx` responses
- Toast notifications integrated using `react-hot-toast`
- Loading spinners added for transactions, network stats, explorer, and metrics charts
- Metadata and OpenGraph tags added on home page with `react-helmet`
- Performance improvements with `React.memo`, `useMemo`, and Vite manual chunking
- Keyboard focus visibility and ARIA labels improved for controls

## Local Development (Frontend + Backend)

1. Start backend from project root:
   ```bash
   python main.py --port 5000 --presentation
   ```
2. In another terminal, run frontend:
   ```bash
   cd PQC_frontend
   npm install
   npm run dev
   ```
3. Open:
   - Frontend: `http://127.0.0.1:5173`
   - Backend API: `http://127.0.0.1:5000`

## Frontend Deployment

1. Set environment variable:
   - `VITE_API_BASE_URL=https://your-backend-domain`
2. Build production assets:
   ```bash
   npm run build
   ```
3. Deploy the generated `dist/` folder to any static host (Vercel, Netlify, Render Static Site, Nginx).
4. Configure SPA fallback to `index.html` for client-side routes.

## Backend Deployment

1. Deploy Python backend service (Render/VM/container) with dependencies from `requirements.txt`.
2. Ensure backend allows CORS from frontend domain.
3. Verify endpoints used by frontend:
   - `/login`, `/register`, `/profile/<user_id>`
   - `/send_transaction`, `/private_transaction`, `/mine`
   - `/blocks`, `/explorer`, `/network`, `/network_metrics`, `/crypto_info`

## Static Asset Optimization Notes

- Vite build uses minification and CSS code splitting.
- Manual chunking separates React/router/charts/vendor code for better cacheability.
- No large raster images are bundled currently; when adding images, prefer WebP/AVIF and keep files compressed before import.

## Auth Payload Contract

- Login form UI uses email and password.
- API payload remains backend-compatible: username and password.
- Register form uses username and password.

### Block Details
- Full block information (hash, timestamp, etc.)
- List of transactions in the block
- Previous block hash (genesis for first block)

## Responsive Design

The application is fully responsive:
- Desktop: Multi-column layouts
- Tablet: 2-column layouts
- Mobile: Single column with optimized spacing

## Error Handling

- API errors are displayed in alert boxes
- 401 responses clear auth data and redirect to login
- Form validation with user-friendly messages
- Loading states prevent duplicate submissions

## Development Notes

### Adding New Pages

1. Create page component in `src/pages/PageName.jsx`
2. Add route in `App.jsx`
3. Wrap with `<ProtectedRoute>` if authentication required
4. Add navigation link in `Navbar.jsx`

### Adding New API Calls

1. Add method to appropriate API object in `src/services/api.js`
2. Use within components with try/catch
3. Token is automatically included via interceptor

### Styling

- Use CSS variables from `:root` for consistency
- Keep component styles in `components.css`
- Page-specific styles in `pages.css`
- Mobile-first responsive design approach

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please check:
1. Backend API is running and accessible
2. Environment variables are correctly set
3. Browser console for error messages
4. Network tab for API request details
