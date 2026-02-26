# PQC Blockchain Wallet - Frontend

A modern React application for interacting with a custom post-quantum cryptography blockchain wallet. Built with React, Vite, and Axios.

## Features

- 🔐 **User Authentication** - Register and login with secure sessions
- ⛓️ **Blockchain Dashboard** - View blockchain status, blocks, and transactions
- 💼 **Wallet Management** - Send transactions and mine blocks
- 🔍 **Advanced Search** - Search by block index, hash, or wallet address
- 📊 **Transaction History** - Filter and view all transactions
- 🌙 **Dark Mode Theme** - Professional dark UI with responsive design
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Modern CSS** - Dark theme with custom properties

## Project Structure

```
src/
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
├── pages/
│   ├── Dashboard.jsx      # Blockchain overview
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration page
│   ├── Wallet.jsx         # Wallet management
│   ├── BlockDetails.jsx   # Single block view
│   ├── TransactionHistory.jsx  # Transaction list
│   └── Search.jsx         # Global search
├── components/
│   ├── Navbar.jsx         # Top navigation
│   ├── Card.jsx           # Reusable card component
│   ├── Table.jsx          # Data table
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── StatusBadge.jsx    # Status display
│   └── ProtectedRoute.jsx # Auth-protected routes
├── context/
│   ├── AuthContext.jsx    # Authentication state
│   └── BlockchainContext.jsx # Blockchain state
├── services/
│   └── api.js             # Axios configuration and API calls
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

The application will open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Integration

The frontend connects to the backend API at:
```
https://he-future-proof-digital-wallet.onrender.com
```

### Available Endpoints

**Authentication:**
- `POST /login` - Login user
- `POST /register` - Register new user
- `GET /profile/<user_id>` - Get user profile

**Blockchain:**
- `GET /chain` - Get all blocks
- `GET /verify` - Verify blockchain validity
- `POST /add_transaction` - Add new transaction
- `POST /mine` - Mine new block

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

### Dashboard
- Displays total blocks and transactions
- Shows blockchain status (valid/invalid)
- Lists latest blocks and transactions
- Network status indicator

### Wallet
- Display wallet address with copy button
- Send transactions to other wallets
- Mine blocks to confirm transactions
- Transaction status feedback

### Search
- Search blocks by index
- Search blocks by hash
- Search wallet addresses (finds in transactions)
- Click blocks to view details

### Transaction History
- Table of all transactions
- Filter by sender or receiver
- Shows transaction amounts and timestamps
- View which block contains each transaction

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

## Future Enhancements

- Real-time blockchain updates via WebSocket
- Transaction filtering by date range
- Export transaction history to CSV
- QR code for wallet address
- Multi-language support
- Two-factor authentication

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please check:
1. Backend API is running and accessible
2. Environment variables are correctly set
3. Browser console for error messages
4. Network tab for API request details
