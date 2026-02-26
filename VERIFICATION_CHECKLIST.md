# ✅ Installation & Verification Checklist

Use this checklist to verify your React frontend is set up correctly.

---

## 📋 Pre-Installation

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor open (VS Code recommended)
- [ ] Backend deployed and running
- [ ] Internet connection available

---

## 🔧 Installation Steps

### Step 1: Navigate to Frontend Directory
```bash
cd Frontend
```
- [ ] Successfully navigated to Frontend folder
- [ ] Can see package.json in current directory

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] All packages installed without errors
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` file updated

### Step 3: Verify Installation
```bash
npm list react react-dom react-router-dom axios
```
- [ ] Shows installed versions
- [ ] No UNMET DEPENDENCIES
- [ ] React 18.2 installed
- [ ] Axios 1.6 installed

---

## 🚀 Running the Application

### Step 4: Start Development Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] Output shows `Local: http://localhost:3000`
- [ ] Browser auto-opens to localhost:3000
- [ ] Page displays without console errors

### Step 5: Verify Application Loads
- [ ] You see the Login page
- [ ] Logo "⛓️ PQC Blockchain" visible
- [ ] Register link visible
- [ ] Form elements render correctly
- [ ] No 404 errors in console

---

## 🔐 Authentication Testing

### Step 6: Register Account
```
1. Click "Register here" link
2. Fill in:
   - Username: testuser
   - Wallet Address: 0x1234567890abcdef
   - Password: TestPass123
3. Click Register button
```
- [ ] Registration form submits
- [ ] No console errors
- [ ] Redirects to Dashboard after success
- [ ] User logged in successfully

### Step 7: Dashboard Verification
- [ ] Dashboard page loads
- [ ] Can see "Total Blocks" stat
- [ ] Can see "Total Transactions" stat
- [ ] Blockchain status visible
- [ ] Latest blocks table visible
- [ ] Latest transactions table visible

---

## 🌐 API Integration Testing

### Step 8: Verify API Connection
```
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh the page
```
- [ ] Network requests appear
- [ ] Request to `/chain` endpoint visible
- [ ] Request to `/verify` endpoint visible
- [ ] Both return 200 OK status
- [ ] No CORS errors
- [ ] No 401 Unauthorized errors

### Step 9: Test API Responses
In DevTools Console:
```javascript
// Should see blockchain data
console.log(localStorage.getItem('user'))
console.log(localStorage.getItem('token'))
```
- [ ] User data stored in localStorage
- [ ] Token present in localStorage
- [ ] Both as JSON (user) and string (token)

---

## 📱 Navigation Testing

### Step 10: Test All Navigation Links
- [ ] Click on "Dashboard" → Dashboard loads
- [ ] Click on "Wallet" → Wallet page loads
- [ ] Click on "Transactions" → Transaction history loads
- [ ] Click on "Search" → Search page loads
- [ ] Click on "Logout" → Redirects to login
- [ ] Click "Login" again → Can log back in

---

## 💼 Feature Testing

### Step 11: Wallet Features
```
1. Go to Wallet page
2. Verify wallet address displays
3. Click "Copy" button
4. Paste to check address copied
```
- [ ] Wallet address visible
- [ ] Copy button works
- [ ] Success message shows
- [ ] Clipboard contains address

### Step 12: Send Transaction Form
```
1. Still on Wallet page
2. Fill in:
   - To: some_address
   - Amount: 10
3. Click "Send Transaction"
```
- [ ] Form accepts input
- [ ] Submit works (check API call)
- [ ] Success/error message appears
- [ ] No console errors

### Step 13: Mine Block
```
1. On Wallet page
2. Click "⛏️ Mine Block"
```
- [ ] Button clickable
- [ ] Shows loading state
- [ ] API call appears in Network tab
- [ ] Success message appears

---

## 🔍 Search & Details Testing

### Step 14: Search Functionality
```
1. Go to Search page
2. Try searching:
   - Block Index: 0
   - Block Hash: (paste any hash)
   - Wallet Address: (your address)
3. Verify results
```
- [ ] All search types load
- [ ] Results display correctly
- [ ] "No results" message when nothing found
- [ ] Results clickable (if blocks)

### Step 15: Block Details
```
1. Go to Dashboard
2. Click any block in "Latest Blocks"
3. Verify details page
```
- [ ] Block details page loads
- [ ] Shows all block information
- [ ] Shows transactions in block
- [ ] "Back" button returns to Dashboard

### Step 16: Transaction History
```
1. Go to Transactions page
2. Apply filter
3. Verify filtered results
```
- [ ] Filter dropdown works
- [ ] Filter input accepts text
- [ ] Table updates with results
- [ ] "No data" shows when no matches

---

## 🎨 UI/UX Testing

### Step 17: Responsive Design
```
1. Resize browser window small
2. Check mobile layout
3. Resize back to large
4. Check desktop layout
```
- [ ] Mobile layout stacks vertically
- [ ] Desktop shows multi-column
- [ ] All elements visible at all sizes
- [ ] Text readable on mobile
- [ ] Buttons clickable on mobile

### Step 18: Dark Theme
- [ ] Background is dark (#0f172a)
- [ ] Text is light colored
- [ ] Cards have dark background
- [ ] Buttons have primary color
- [ ] No readability issues
- [ ] Colors match design

### Step 19: Loading States
```
1. Watch page load
2. Refresh page
3. Click API buttons
```
- [ ] Loading spinner appears on load
- [ ] Spinner disappears when data loads
- [ ] Button states change during loading
- [ ] No stuck loading states

---

## 🛡️ Error Handling Testing

### Step 20: Error Scenarios
```
1. Logout
2. Try accessing /wallet directly (in URL)
3. Should redirect to /login
```
- [ ] Protected routes redirect correctly
- [ ] Error messages display clearly
- [ ] Buttons disable during errors
- [ ] Users can retry

### Step 21: Invalid Input
```
1. Register with same username twice
2. Send transaction with invalid address
3. Search with empty value
```
- [ ] Validation messages appear
- [ ] Form rejects invalid data
- [ ] API errors display properly
- [ ] Users can fix and retry

---

## 📊 Console & DevTools Verification

### Step 22: Browser Console
```
Press F12 → Go to Console tab
```
- [ ] No red console errors
- [ ] No CORS warnings
- [ ] No "undefined" references
- [ ] No memory leaks visible

### Step 23: Network Tab
```
Press F12 → Go to Network tab
Perform an action (send tx, mine, etc)
```
- [ ] All requests show 200/201 status
- [ ] No 401 unauthorized
- [ ] No 404 not found
- [ ] No CORS issues
- [ ] Responses are valid JSON

### Step 24: Storage Tab
```
Press F12 → Go to Application → Local Storage
```
- [ ] Can see "token" key
- [ ] Can see "user" key
- [ ] Values are not empty
- [ ] User data is valid JSON
- [ ] Token looks like JWT

---

## 🏗️ Build Testing

### Step 25: Production Build
```bash
npm run build
```
- [ ] Build completes successfully
- [ ] `dist/` folder created
- [ ] No build errors
- [ ] All files optimized

### Step 26: Preview Build
```bash
npm run preview
```
- [ ] Preview server starts
- [ ] Application loads from `dist/`
- [ ] All features work same as dev
- [ ] Performance is acceptable

---

## 📚 Documentation Verification

### Step 27: Check Documentation Files
- [ ] README.md exists and readable
- [ ] QUICK_START.md exists
- [ ] PROJECT_SETUP.md exists
- [ ] ARCHITECTURE.md exists
- [ ] FILE_SUMMARY.md exists
- [ ] COMPLETE.md exists

### Step 28: Verify File Structure
```
Frontend/
├── src/
│   ├── pages/        ✓ 7 files
│   ├── components/   ✓ 6 files
│   ├── context/      ✓ 2 files
│   ├── services/     ✓ 1 file
│   ├── styles/       ✓ 3 files
│   ├── App.jsx       ✓
│   └── main.jsx      ✓
├── package.json      ✓
├── vite.config.js    ✓
└── index.html        ✓
```
- [ ] All folders present
- [ ] All files created
- [ ] File names correct
- [ ] No typos

---

## 🎯 Final Integration Test

### Step 29: Complete User Journey
```
1. Logout (if logged in)
2. Register new account
3. Login with new account
4. View Dashboard
5. Send transaction
6. Mine block
7. View block details
8. View transaction history
9. Search for block
10. Logout
11. Login again
12. Verify still logged in
```
- [ ] All steps complete without errors
- [ ] Data persists correctly
- [ ] Navigation works smoothly
- [ ] No broken links

---

## 🚀 Deployment Ready Checklist

- [ ] All build outputs generated
- [ ] No console errors
- [ ] All tests pass
- [ ] Backend API accessible
- [ ] Environment variables set
- [ ] Documentation complete
- [ ] .gitignore configured
- [ ] node_modules in .gitignore
- [ ] dist/ not in .gitignore
- [ ] dist/ built successfully

---

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change in vite.config.js |
| API 404 errors | Verify backend URL in api.js |
| 401 errors | Clear localStorage, re-login |
| Styles not loading | Hard refresh (Ctrl+Shift+R) |
| Routes not working | Check React Router setup |
| Module not found | Run `npm install` again |
| CORS errors | Check backend CORS config |

---

## ✅ Sign-Off

Once all checkboxes above are checked:

- **Development**: ✅ Ready
- **Testing**: ✅ Complete
- **Documentation**: ✅ Verified
- **Deployment**: ✅ Ready

**Your React frontend is fully functional and production-ready!**

---

## 📞 Next Steps

1. ✅ Deploy to production server
2. ✅ Set up continuous deployment
3. ✅ Monitor error logs
4. ✅ Gather user feedback
5. ✅ Plan enhancements

---

**Generated**: February 27, 2026
**Project**: PQC Blockchain Wallet - React Frontend
**Status**: ✅ COMPLETE
