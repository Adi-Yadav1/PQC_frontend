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

export function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Validate email
    if (!formData.email) {
      setError('Email is required')
      return
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address (e.g., user@gmail.com)')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Backend register expects username/password; we use email as username.
      const response = await authAPI.register(formData.email, formData.password)
      
      // Check status code explicitly
      if (response.status === 200 || response.status === 201) {
        const { user_id, wallet_address, message } = response.data
        
        // Store user data in localStorage (wallet_address from backend)
        localStorage.setItem('user_id', user_id)
        localStorage.setItem('email', formData.email)
        localStorage.setItem('username', formData.email)
        localStorage.setItem('firstName', formData.firstName)
        localStorage.setItem('lastName', formData.lastName)
        localStorage.setItem('wallet_address', wallet_address)
        
        // Update auth context
        login({ 
          id: user_id, 
          username: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email, 
          wallet_address: wallet_address 
        }, user_id)
        
        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        setError('Unexpected response from server')
      }
    } catch (err) {
      console.error('Registration error:', err)
      // Handle specific error statuses
      if (err.response?.status === 400) {
        setError(err.response?.data?.error || 'Invalid registration data')
      } else if (err.response?.status === 409) {
        setError('Username already exists')
      } else if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Registration failed. Please try again.')
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
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>

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
