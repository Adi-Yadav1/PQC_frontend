# Application Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Vite Application                      │
│                    (Frontend - Port 3000)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
           ┌────────────────────────────────────────┐
           │      React Router (Client-Side)       │
           │  /  /wallet  /block/:id  /transactions│
           │  /search  /login  /register           │
           └────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
          ┌───▼──────────────┐        ┌──────▼────────────┐
          │   Auth Context   │        │ Blockchain        │
          │                  │        │ Context           │
          │ • user           │        │ • blocks          │
          │ • token          │        │ • isValid         │
          │ • isAuthenticated│        │ • loading         │
          └──────────────────┘        └───────────────────┘
                    │                          │
                    └──────────────┬───────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   Pages & Components       │
                    │                            │
                    │  • Dashboard               │
                    │  • Wallet                  │
                    │  • BlockDetails            │
                    │  • TransactionHistory      │
                    │  • Search                  │
                    │  • Login/Register          │
                    │                            │
                    │  + Navbar, Card, Table     │
                    │  + StatusBadge, Spinner    │
                    └──────────────┬─────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   Axios Service Layer      │
                    │   (src/services/api.js)    │
                    │                            │
                    │  • Base URL Configuration  │
                    │  • Auth Interceptor        │
                    │  • Error Interceptor       │
                    │  • authAPI methods         │
                    │  • blockchainAPI methods   │
                    └──────────────┬─────────────┘
                                   │
        ┌──────────────────────────┴──────────────────────────┐
        │                                                      │
        │         Backend REST API (Render.com)              │
        │  https://he-future-proof-digital-wallet.onrender.com
        │                                                      │
        │  Endpoints:                                         │
        │  • POST /login                                      │
        │  • POST /register                                   │
        │  • GET /profile/<user_id>                          │
        │  • GET /chain                                       │
        │  • GET /verify                                      │
        │  • POST /add_transaction                           │
        │  • POST /mine                                       │
        │                                                      │
        └──────────────────────────────────────────────────────┘
                                   │
        ┌──────────────────────────▼──────────────────────────┐
        │      Flask Backend + Post-Quantum Blockchain       │
        │                                                      │
        │  • User Database                                   │
        │  • Blockchain Ledger                              │
        │  • Transaction Pool                               │
        │  • Lamport Signatures                             │
        │                                                      │
        └──────────────────────────────────────────────────────┘
```

## Component Tree

```
App.jsx
├── AuthProvider
│   └── BlockchainProvider
│       ├── Navbar
│       │   ├── Links
│       │   └── User Menu
│       │
│       └── Routes
│           ├── /login → Login.jsx
│           │   └── Form
│           │
│           ├── /register → Register.jsx
│           │   └── Form
│           │
│           ├── / → Dashboard.jsx (Protected)
│           │   ├── Card (Stats)
│           │   │   ├── Card (Total Blocks)
│           │   │   ├── Card (Total Transactions)
│           │   │   ├── Card (Blockchain Status)
│           │   │   └── Card (Network Status)
│           │   ├── Table (Latest Blocks)
│           │   └── Table (Latest Transactions)
│           │
│           ├── /wallet → Wallet.jsx (Protected)
│           │   ├── Card (Wallet Info)
│           │   │   └── Copy Address Button
│           │   ├── Card (Send Transaction)
│           │   │   └── Form
│           │   └── Card (Mining)
│           │       └── Mine Button
│           │
│           ├── /block/:blockIndex → BlockDetails.jsx (Protected)
│           │   ├── Card (Block Info)
│           │   │   ├── Hash
│           │   │   ├── Previous Hash
│           │   │   └── Timestamp
│           │   └── Table (Transactions)
│           │
│           ├── /transactions → TransactionHistory.jsx (Protected)
│           │   ├── Card (Filters)
│           │   │   ├── Filter Type Select
│           │   │   └── Search Input
│           │   └── Table (Transactions)
│           │
│           └── /search → Search.jsx (Protected)
│               ├── Card (Search)
│               │   ├── Search Type Select
│               │   ├── Search Input
│               │   └── Search Button
│               └── Table (Results)
```

## State Management Flow

```
┌─────────────────────────────────────────┐
│      Local Storage Persistence          │
│   • token (JWT)                         │
│   • user (JSON)                         │
└─────────────────────────────────────────┘
            ▲                     │
            │                     ▼
┌───────────┴──────────────────────────────┐
│         AuthContext Provider             │
│                                          │
│  State:                                  │
│  • user: User object                     │
│  • token: JWT token                      │
│  • loading: boolean                      │
│  • isAuthenticated: boolean              │
│                                          │
│  Methods:                                │
│  • login(userData, token)                │
│  • logout()                              │
└──────────────────────────────────────────┘
            ▲
            │
     useAuth() Hook
            │
     ┌──────┴──────┬──────────┬──────────┐
     │             │          │          │
  Navbar      Wallet       Login     Register
  Pages
```

## API Request/Response Flow

```
                   Component / Page
                          │
                          ▼
                  blockchainAPI.getChain()
                  authAPI.login()
                  etc.
                          │
                          ▼
        ┌─────────────────────────────────┐
        │      axios.interceptors.request │
        │  • Add Authorization header     │
        │  • Add Content-Type header      │
        └──────────────────┬──────────────┘
                           │
                           ▼
        ┌─────────────────────────────────┐
        │   HTTP Request to Backend API    │
        │                                 │
        │   Base URL:                     │
        │   https://he-future-proof...    │
        └──────────────────┬──────────────┘
                           │
        ┌──────────────────▼──────────────┐
        │      Backend Response           │
        │  • Status 200: Success          │
        │  • Status 401: Unauthorized     │
        │  • Status 500: Server Error     │
        └──────────────────┬──────────────┘
                           │
        ┌──────────────────▼──────────────┐
        │  axios.interceptors.response    │
        │  • Check status 401 → redirect  │
        │  • Clear localStorage on 401    │
        │  • Return response data         │
        └──────────────────┬──────────────┘
                           │
                           ▼
                 Component State Update
                (setState / useEffect)
                           │
                           ▼
                    Re-render UI
```

## Data Flow Example: Send Transaction

```
User Input
    │
    ├─→ Wallet.jsx handleAddTransaction()
    │       │
    │       ├─→ blockchainAPI.addTransaction()
    │       │       │
    │       │       ├─→ Create Payment
    │       │       │
    │       │       ├─→ Add Auth Header
    │       │       │       │
    │       │       │       └─→ POST /add_transaction
    │       │       │
    │       │       ├─→ Response Interceptor
    │       │       │
    │       │       └─→ Return response.data
    │       │
    │       ├─→ Update State (message)
    │       │
    │       └─→ Re-render with success/error
    │
    └─→ Refresh blockchain data (optional)
```

## File Organization Logic

```
src/
│
├── pages/
│   └─ Views mapped to routes
│   └─ Each page is a full screen
│   └─ Connect to API + Context
│
├── components/
│   └─ Reusable UI pieces
│   └─ No logic/state (mostly)
│   └─ Receive props from pages
│
├── context/
│   └─ Global state management
│   └─ Shared between pages
│   └─ Auth & Blockchain data
│
├── services/
│   └─ API communication
│   └─ Axios configuration
│   └─ Request/Response handling
│
├── styles/
│   └─ Global styles (index.css)
│   └─ Component styles (components.css)
│   └─ Page styles (pages.css)
│   └─ Dark theme variables
│
└── App.jsx
    └─ Route setup
    └─ Provider wrapping
    └─ Main entry point
```

## Styling Architecture

```
CSS Variables (Root)
    │
    ├─→ Colors
    │   ├─ Primary: #6366f1
    │   ├─ Success: #10b981
    │   ├─ Error: #ef4444
    │   └─ Background: #0f172a
    │
    ├─→ Spacing
    │   ├─ 0.25rem, 0.5rem, 1rem, 1.5rem
    │   └─ Used consistently
    │
    ├─→ Typography
    │   ├─ System font stack
    │   ├─ 1.5rem to 2.5rem headers
    │   └─ 1rem base text
    │
    └─→ Effects
        ├─ Transitions: 0.3s cubic-bezier
        ├─ Shadows: box-shadow
        └─ Hover states

Responsive Breakpoints
    │
    ├─→ Desktop (> 1024px): Full layout
    ├─→ Tablet (768-1024px): 2 column
    └─→ Mobile (< 768px): 1 column
```

## Authentication Flow Diagram

```
User at /login or /register
        │
        ▼
    Form Submit
        │
        ├─→ authAPI.login() or authAPI.register()
        │
        ▼
    Backend Validation
        │
        ├─→ Success: Return {user, token}
        │           │
        │           ├─→ AuthContext.login()
        │           │       │
        │           │       ├─→ Set user state
        │           │       ├─→ Set token state
        │           │       ├─→ Save to localStorage
        │           │       │
        │           │       └─→ Navigate to /
        │
        └─→ Error: Return error message
                        │
                        └─→ Display in alert
                            Retry form
```

## Protected Route Flow

```
Navigate to /wallet
        │
        ▼
    <ProtectedRoute>
        │
        ├─→ Check isAuthenticated
        │       │
        │       ├─→ true: Render page ✓
        │       │
        │       └─→ false: <Navigate to="/login" />
        │
        └─→ Check loading
                │
                └─→ Show <LoadingSpinner /> while loading
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Reusable components
- ✅ Centralized state management
- ✅ Scalable API integration
- ✅ Responsive design
- ✅ Security best practices
