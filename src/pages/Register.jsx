import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/pages.css'

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    wallet_address: '',
  })
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.wallet_address) {
      setError('Wallet address is required')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await authAPI.register(
        formData.username,
        formData.password,
        formData.wallet_address
      )
      
      // Check status code explicitly
      if (response.status === 200 || response.status === 201) {
        const { user_id, message } = response.data
        
        // Store user data in localStorage
        localStorage.setItem('user_id', user_id)
        localStorage.setItem('username', formData.username)
        localStorage.setItem('wallet_address', formData.wallet_address)
        
        // Update auth context
        login({ 
          id: user_id, 
          username: formData.username, 
          wallet_address: formData.wallet_address 
        }, user_id)
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        setError('Unexpected response from server')
      }
    } catch (err) {
      // Handle specific error statuses
      if (err.response?.status === 400) {
        setError(err.response?.data?.message || 'Invalid registration data')
      } else if (err.response?.status === 409) {
        setError('Username already exists')
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="wallet_address">Wallet Address</label>
            <input
              type="text"
              id="wallet_address"
              name="wallet_address"
              value={formData.wallet_address}
              onChange={handleChange}
              required
              placeholder="Enter your wallet address"
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
              placeholder="Enter a strong password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
