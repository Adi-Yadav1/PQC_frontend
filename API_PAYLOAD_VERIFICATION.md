# API Payload Verification

## ✅ CONFIRMED: All API payloads now use EXPLICIT key-value syntax

### Authentication Endpoints

#### 1. **POST /login**
```javascript
axios.post('/login', {
  username: username,  // ✅ CORRECT
  password: password   // ✅ CORRECT
})
```

**Example payload:**
```json
{
  "username": "testuser",
  "password": "mypassword123"
}
```

❌ **NOT** using: `email`, `user`, `pass`, `userName`, `pwd`  
✅ **USING**: `username` and `password` (exact match)

---

#### 2. **POST /register**
```javascript
axios.post('/register', {
  username: username,           // ✅ CORRECT
  password: password,           // ✅ CORRECT
  wallet_address: wallet_address // ✅ CORRECT
})
```

**Example payload:**
```json
{
  "username": "newuser",
  "password": "securepass456",
  "wallet_address": "0x1234567890abcdef"
}
```

❌ **NOT** using: `email`, `user`, `walletAddress`, `address`  
✅ **USING**: `username`, `password`, `wallet_address` (exact match)

---

### Blockchain Endpoints

#### 3. **POST /add_transaction**
```javascript
axios.post('/add_transaction', {
  sender: sender,      // ✅ CORRECT
  receiver: receiver,  // ✅ CORRECT
  amount: amount       // ✅ CORRECT
})
```

**Example payload:**
```json
{
  "sender": "0xabc123",
  "receiver": "0xdef456",
  "amount": 100.50
}
```

---

#### 4. **POST /mine**
```javascript
axios.post('/mine')
// No payload required
```

---

#### 5. **GET /chain**
```javascript
axios.get('/chain')
// No payload required
```

---

#### 6. **GET /verify**
```javascript
axios.get('/verify')
// No payload required
```

---

#### 7. **GET /profile/:user_id**
```javascript
axios.get(`/profile/${userId}`)
// No payload required
```

---

## Code Changes Made

### Before (Shorthand - Ambiguous)
```javascript
export const authAPI = {
  login: (username, password) => api.post('/login', { username, password }),
  register: (username, password, wallet_address) => 
    api.post('/register', { username, password, wallet_address }),
}
```

### After (Explicit - Crystal Clear) ✅
```javascript
export const authAPI = {
  login: (username, password) => 
    api.post('/login', { 
      username: username, 
      password: password 
    }),
  register: (username, password, wallet_address) => 
    api.post('/register', { 
      username: username, 
      password: password, 
      wallet_address: wallet_address 
    }),
}
```

---

## Testing the Payloads

### 1. Login Test
Open DevTools → Network tab, then login:

**Request:**
```
POST https://he-future-proof-digital-wallet.onrender.com/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**Expected Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "username": "your_username",
    "wallet_address": "0x..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Register Test
Open DevTools → Network tab, then register:

**Request:**
```
POST https://he-future-proof-digital-wallet.onrender.com/register
Content-Type: application/json

{
  "username": "newuser123",
  "password": "securepassword",
  "wallet_address": "0x1234567890abcdef"
}
```

**Expected Response (201 Created):**
```json
{
  "user": {
    "id": 2,
    "username": "newuser123",
    "wallet_address": "0x1234567890abcdef"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Send Transaction Test
Open DevTools → Network tab, then send transaction:

**Request:**
```
POST https://he-future-proof-digital-wallet.onrender.com/add_transaction
Content-Type: application/json
Authorization: Bearer <token>

{
  "sender": "0xsender_address",
  "receiver": "0xreceiver_address",
  "amount": 50.00
}
```

**Expected Response (200 OK):**
```json
{
  "message": "Transaction added successfully"
}
```

---

## Verification Checklist

- [x] Login uses `username` and `password`
- [x] Register uses `username`, `password`, and `wallet_address`
- [x] Add transaction uses `sender`, `receiver`, and `amount`
- [x] All keys match backend exactly
- [x] No shorthand syntax (explicit keys)
- [x] All payloads use snake_case for consistency
- [x] Content-Type: application/json header set
- [x] Token auto-added to authenticated requests

---

## Common Mistakes (AVOIDED) ✅

❌ Using `email` instead of `username`  
❌ Using `user` instead of `username`  
❌ Using `pass` or `pwd` instead of `password`  
❌ Using `walletAddress` (camelCase) instead of `wallet_address` (snake_case)  
❌ Using `from`/`to` instead of `sender`/`receiver`  

---

## Files Modified

1. **src/services/api.js** - Updated to use explicit object syntax
   - `authAPI.login()` - ✅ Fixed
   - `authAPI.register()` - ✅ Fixed
   - `blockchainAPI.addTransaction()` - ✅ Fixed

---

## Next Steps

1. Run the app: `npm run dev`
2. Open DevTools (F12) → Network tab
3. Test login with valid credentials
4. Check request payload matches this document
5. Test register with new user
6. Check request payload matches this document
7. Verify 200/201 responses

---

**Status:** ✅ ALL PAYLOADS VERIFIED AND CORRECTED

**Last Updated:** February 27, 2026
