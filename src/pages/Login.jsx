import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/pages.css'

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Validate email
    if (!formData.email) {
      setError('Email is required')
      setLoading(false)
      return
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address (e.g., user@gmail.com)')
      setLoading(false)
      return
    }
    
    try {
      // Backend authenticates using username/password; we use email as username.
      const response = await authAPI.login(formData.email, formData.password)
      
      // Check status code explicitly
      if (response.status === 200) {
        const { user_id, message } = response.data
        
        // Try to fetch user profile to get wallet_address
        try {
          const profileRes = await authAPI.getProfile(user_id)
          const walletAddress = profileRes.data?.wallet_address || ''
          
          // Store complete user data
          localStorage.setItem('user_id', user_id)
          localStorage.setItem('email', formData.email)
          localStorage.setItem('username', formData.email)
          localStorage.setItem('wallet_address', walletAddress)
          
          // Update auth context
          login({ 
            id: user_id, 
            username: formData.email,
            email: formData.email,
            wallet_address: walletAddress 
          }, user_id)
        } catch (profileErr) {
          // If profile fetch fails, login without wallet_address
          localStorage.setItem('user_id', user_id)
          localStorage.setItem('email', formData.email)
          localStorage.setItem('username', formData.email)
          
          login({ id: user_id, username: formData.email, email: formData.email }, user_id)
        }
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        setError('Unexpected response from server')
      }
    } catch (err) {
      console.error('Login error:', err)
      // Handle 401 and other errors
      if (err.response?.status === 401) {
        setError('Invalid username or password')
      } else if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Login failed. Please check your credentials and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email (e.g., user@gmail.com)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
