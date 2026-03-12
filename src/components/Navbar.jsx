import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/components.css'

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PQC Shield Ledger
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/wallet" className="nav-link">Wallet</Link>
              <Link to="/explorer" className="nav-link">Blockchain Explorer</Link>
              <Link to="/transactions" className="nav-link">Transactions</Link>
              <Link to="/network" className="nav-link">Network</Link>
              <Link to="/demo-control" className="nav-link">Demo Control</Link>
              <Link to="/metrics" className="nav-link">Metrics</Link>
              <Link to="/cryptography-info" className="nav-link">Cryptography Info</Link>
              <Link to="/quantum-threat" className="nav-link">Quantum Threat</Link>
              <Link to="/search" className="nav-link">Search</Link>
              
              <div className="nav-user">
                <span className="user-name">{user?.username}</span>
                <button onClick={handleLogout} className="btn-logout" aria-label="Log out">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
