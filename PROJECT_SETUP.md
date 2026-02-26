# PQC Blockchain Wallet - Frontend Project Setup

## Complete File Structure

```
Frontend/
├── package.json              # Project dependencies and scripts
├── vite.config.js           # Vite configuration
├── index.html               # HTML entry point
├── .gitignore              # Git ignore rules
├── .env.example            # Environment variables template
├── README.md               # Project documentation
│
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app with routing
│   │
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Blockchain dashboard
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Wallet.jsx      # Wallet management
│   │   ├── BlockDetails.jsx # Block details view
│   │   ├── TransactionHistory.jsx # Transactions list
│   │   └── Search.jsx      # Global search
│   │
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Card.jsx        # Card component
│   │   ├── Table.jsx       # Data table
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── StatusBadge.jsx # Status badge
│   │   └── ProtectedRoute.jsx # Auth-protected routes
│   │
│   ├── context/            # React context
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── BlockchainContext.jsx # Blockchain state
│   │
│   ├── services/           # API services
│   │   └── api.js          # Axios configuration
│   │
│   └── styles/             # CSS styles
│       ├── index.css       # Global styles
│       ├── components.css  # Component styles
│       └── pages.css       # Page styles
```

## Installation & Usage

### Prerequisites
- Node.js 16+ and npm

### Setup

```bash
# 1. Navigate to Frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

## Key Technologies

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool (instant HMR)
- **React Router 6.20** - Client-side routing
- **Axios 1.6** - HTTP client
- **Modern CSS** - Dark theme with variables

## Features Implemented

### 1. Authentication System
✅ User registration with wallet address
✅ User login with credential validation
✅ JWT token storage in localStorage
✅ Protected routes with auto-redirect
✅ Logout functionality

### 2. Dashboard Page
✅ Total blocks counter
✅ Total transactions counter
✅ Blockchain validity status
✅ Network status indicator
✅ Latest 5 blocks table
✅ Latest transactions table
✅ Refresh data button

### 3. Wallet Management
✅ Display wallet address
✅ Copy address to clipboard
✅ Send transaction form
✅ Mine block button
✅ Transaction status feedback
✅ Error handling

### 4. Blockchain Exploration
✅ Block details page with all info
✅ Transaction history with filtering
✅ Global search by block/address
✅ Click to navigate between blocks
✅ Transaction list in blocks

### 5. UI/UX
✅ Dark mode theme (professional)
✅ Responsive design (all devices)
✅ Loading spinners
✅ Status badges
✅ Data tables with sorting
✅ Forms with validation
✅ Alert/notification system

## API Endpoints Connected

```javascript
// Authentication
POST /login
POST /register
GET /profile/<user_id>

// Blockchain Operations
GET /chain          // Get all blocks
GET /verify         // Verify blockchain
POST /add_transaction  // Send transaction
POST /mine          // Mine block
```

## Environment Configuration

Create `.env.local`:
```
VITE_API_BASE_URL=https://he-future-proof-digital-wallet.onrender.com
```

## Component Architecture

### Pages
- **Dashboard**: Overview of blockchain with stats
- **Login/Register**: Auth pages
- **Wallet**: Manage transactions and mining
- **BlockDetails**: Single block information
- **TransactionHistory**: All transactions with filters
- **Search**: Global search functionality

### Shared Components
- **Navbar**: Top navigation with user menu
- **Card**: Container for content
- **Table**: Data display with sorting
- **LoadingSpinner**: Loading indicator
- **StatusBadge**: Status display (valid/invalid/online)
- **ProtectedRoute**: Route protection wrapper

### Context Providers
- **AuthContext**: User authentication state
- **BlockchainContext**: Blockchain data state

### Services
- **api.js**: Axios instance with interceptors
  - Base URL configuration
  - Token auto-injection
  - Error handling (401 redirect)

## Styling System

### CSS Variables (Dark Theme)
```css
Primary colors
--primary: #6366f1
--primary-dark: #4f46e5

Status colors
--success: #10b981
--error: #ef4444
--warning: #f59e0b

Background colors
--bg-dark: #0f172a
--bg-card: #1e293b
--text-primary: #f1f5f9
```

### Responsive Breakpoints
- Desktop: Full layout
- Tablet (max-width: 1024px): Adjusted grids
- Mobile (max-width: 768px): Single column

## How to Extend

### Add a New Page
1. Create `src/pages/MyPage.jsx`
2. Add route in `App.jsx`
3. Import and configure routing

### Add a New Component
1. Create `src/components/MyComponent.jsx`
2. Style in `components.css`
3. Import and use in pages

### Add API Calls
1. Add method to `api.js`
2. Use with `try/catch` in components
3. Token is automatic via interceptor

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Production Build

```bash
npm run build
# Outputs optimized files to dist/

npm run preview
# Preview production build locally
```

## Troubleshooting

### API Connection Issues
- Check backend URL in api.js
- Verify CORS is enabled on backend
- Check network tab in DevTools

### 401 Unauthorized
- Login again to refresh token
- Check localStorage for token
- Clear browser cache if needed

### 404 on Routes
- Ensure route paths match in App.jsx
- Check React Router configuration
- Verify page component exports

## Notes

- All dates are localized to user's timezone
- Wallet addresses are displayed as-is from backend
- Blocks are rendered in reverse order (newest first)
- Search is case-insensitive for addresses
- localStorage is used for session persistence

## Future Improvements

- Real-time updates with WebSocket
- Transaction filtering by date
- Export to CSV
- QR codes
- Multi-language
- Advanced charting
