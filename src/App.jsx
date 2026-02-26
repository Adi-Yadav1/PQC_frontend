import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BlockchainProvider } from './context/BlockchainContext'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Wallet } from './pages/Wallet'
import { BlockDetails } from './pages/BlockDetails'
import { TransactionHistory } from './pages/TransactionHistory'
import { Search } from './pages/Search'

import './styles/index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlockchainProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/wallet"
                  element={
                    <ProtectedRoute>
                      <Wallet />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/block/:blockIndex"
                  element={
                    <ProtectedRoute>
                      <BlockDetails />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/transactions"
                  element={
                    <ProtectedRoute>
                      <TransactionHistory />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  }
                />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </BlockchainProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
