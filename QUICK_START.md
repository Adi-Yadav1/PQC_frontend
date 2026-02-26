# Quick Start Guide

## Setup (5 minutes)

```bash
# 1. Install Node.js dependencies
npm install

# 2. Start development server
npm run dev

# Open http://localhost:3000 in browser
```

## First Run

1. **Register** at `/register`
   - Choose username
   - Enter wallet address (any string for testing)
   - Set password

2. **Home Dashboard** - You'll see:
   - Blockchain statistics
   - Latest blocks
   - Latest transactions
   - Network status

## Testing the Features

### Send a Transaction
1. Go to **Wallet** page
2. Enter receiver's wallet address
3. Enter amount
4. Click "Send Transaction"

### Mine a Block
1. On **Wallet** page
2. Click "⛏️ Mine Block"
3. This confirms pending transactions

### View Block Details
1. On **Dashboard**
2. Click any block in "Latest Blocks" table
3. See full block information and transactions

### Search Blockchain
1. Go to **Search** page
2. Choose search type (Block Index, Hash, Address)
3. Enter search value
4. View results

### View Transaction History
1. Go to **Transactions** page
2. Filter by Sender, Receiver, or All
3. Enter wallet address to filter
4. See all matching transactions

## API Testing

The app connects to this backend:
```
https://he-future-proof-digital-wallet.onrender.com
```

### Verify Connection
Open browser DevTools (F12) → Network tab
- You should see requests to the backend API
- Check for any 401/500 errors

## Styling Guide

### Change Theme Colors

Edit `src/styles/index.css`:

```css
:root {
  --primary: #6366f1;      /* Main color */
  --success: #10b981;      /* Success color */
  --error: #ef4444;        /* Error color */
  --bg-dark: #0f172a;      /* Background */
  --text-primary: #f1f5f9; /* Text color */
}
```

### Add New Page

1. Create `src/pages/MyPage.jsx`:
```jsx
export function MyPage() {
  return <div>My Page</div>
}
export default MyPage
```

2. Add to `src/App.jsx`:
```jsx
import { MyPage } from './pages/MyPage'

<Route path="/mypage" element={
  <ProtectedRoute>
    <MyPage />
  </ProtectedRoute>
} />
```

3. Add link in `src/components/Navbar.jsx`:
```jsx
<Link to="/mypage" className="nav-link">My Page</Link>
```

## Component Examples

### Display Data in a Table
```jsx
import { Table } from '../components/Table'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'amount', label: 'Amount' },
]

<Table columns={columns} data={myData} />
```

### Show Status Badge
```jsx
import { StatusBadge } from '../components/StatusBadge'

<StatusBadge status="valid" text="Valid" />
<StatusBadge status="invalid" text="Invalid" />
```

### Display Card
```jsx
import { Card } from '../components/Card'

<Card title="My Title">
  <p>Card content here</p>
</Card>
```

## API Calls

All API calls go through `src/services/api.js`

### Example Usage
```jsx
import { blockchainAPI } from '../services/api'

// Get blockchain data
const response = await blockchainAPI.getChain()
const blocks = response.data

// Send transaction
await blockchainAPI.addTransaction(sender, receiver, amount)

// Mine block
await blockchainAPI.mineBlock()
```

## Debugging Tips

1. **Check Console** (F12)
   - Look for JS errors
   - Check API responses

2. **Network Tab** (F12)
   - See API requests
   - Check response status
   - Verify data structure

3. **React DevTools**
   - Install React DevTools extension
   - Inspect component state
   - Check prop values

4. **Local Storage**
   - Open Developer Tools
   - Go to Application → Local Storage
   - Check for `token` and `user` keys

## Common Issues

**Issue: "Network Error"**
- Backend API is down
- Check internet connection
- Verify backend URL in api.js

**Issue: "401 Unauthorized"**
- Token expired
- Clear localStorage and login again
- Check browser cookies

**Issue: "Page not loading"**
- Check React Router paths
- Verify component export in pages
- Check browser console for errors

**Issue: "Styles not applied"**
- Hard refresh browser (Ctrl+Shift+R)
- Check CSS file imports
- Verify CSS variable usage

## Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install axios

# Remove package
npm uninstall axios
```

## Environment Variables

Create `.env.local`:
```
VITE_API_BASE_URL=https://he-future-proof-digital-wallet.onrender.com
```

## File Structure Quick Reference

```
src/
├── pages/          → Full page components
├── components/     → Reusable UI components
├── context/        → Global state (Auth, Blockchain)
├── services/       → API configuration
└── styles/         → CSS files
```

## Next Steps

1. ✅ Run `npm install` and `npm run dev`
2. ✅ Register a test account
3. ✅ Test all features (send tx, mine, search)
4. ✅ Explore code structure
5. ✅ Customize styling/colors
6. ✅ Add new features as needed

## Documentation

- **README.md** - Full project overview
- **PROJECT_SETUP.md** - Detailed setup guide
- **Code Comments** - Inline documentation

## Support

For issues:
1. Check error message in console
2. Review API response in Network tab
3. Verify backend is running
4. Check authentication status
5. Review component props/state
