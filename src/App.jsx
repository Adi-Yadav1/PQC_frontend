import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BlockchainProvider } from './context/BlockchainContext'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorBoundary } from './components/ErrorBoundary'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Wallet } from './pages/Wallet'
import { BlockDetails } from './pages/BlockDetails'
import { Search } from './pages/Search'
import { CryptoComparison } from './pages/CryptoComparison'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))
const Explorer = lazy(() => import('./pages/Explorer').then((m) => ({ default: m.Explorer })))
const TransactionHistory = lazy(() => import('./pages/TransactionHistory').then((m) => ({ default: m.TransactionHistory })))
const Network = lazy(() => import('./pages/Network').then((m) => ({ default: m.Network })))
const DemoControl = lazy(() => import('./pages/DemoControl').then((m) => ({ default: m.DemoControl })))
const Metrics = lazy(() => import('./pages/Metrics').then((m) => ({ default: m.Metrics })))
const CryptographyInfo = lazy(() => import('./pages/CryptographyInfo').then((m) => ({ default: m.CryptographyInfo })))
const QuantumThreat = lazy(() => import('./pages/QuantumThreat').then((m) => ({ default: m.QuantumThreat })))

import './styles/index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlockchainProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
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
                      path="/home"
                      element={<Navigate to="/" replace />}
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

                    <Route
                      path="/explorer"
                      element={
                        <ProtectedRoute>
                          <Explorer />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/blockchain-explorer"
                      element={<Navigate to="/explorer" replace />}
                    />

                    <Route
                      path="/network"
                      element={
                        <ProtectedRoute>
                          <Network />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/demo-control"
                      element={
                        <ProtectedRoute>
                          <DemoControl />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/metrics"
                      element={
                        <ProtectedRoute>
                          <Metrics />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/cryptography-info"
                      element={
                        <ProtectedRoute>
                          <CryptographyInfo />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/quantum-threat"
                      element={
                        <ProtectedRoute>
                          <QuantumThreat />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/crypto-comparison"
                      element={
                        <ProtectedRoute>
                          <CryptoComparison />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
          </div>
        </BlockchainProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
