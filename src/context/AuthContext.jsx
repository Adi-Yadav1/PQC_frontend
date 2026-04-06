import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const buildDisplayName = (userData = {}) => {
    if (userData.displayName) return userData.displayName

    const first = (userData.firstName || '').trim()
    const last = (userData.lastName || '').trim()
    const fullName = `${first} ${last}`.trim()
    if (fullName) return fullName

    const identity = (userData.username || userData.email || '').trim()
    if (!identity) return ''
    if (identity.includes('@')) {
      return identity.split('@')[0]
    }

    return identity
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id')
    const storedUsername = localStorage.getItem('username')
    const storedEmail = localStorage.getItem('email')
    const storedFirstName = localStorage.getItem('firstName')
    const storedLastName = localStorage.getItem('lastName')
    const storedDisplayName = localStorage.getItem('display_name')
    const storedWalletAddress = localStorage.getItem('wallet_address')
    
    if (storedUserId && storedUsername) {
      setUser({ 
        id: storedUserId, 
        username: storedUsername,
        email: storedEmail || '',
        firstName: storedFirstName || '',
        lastName: storedLastName || '',
        displayName: storedDisplayName || storedUsername,
        wallet_address: storedWalletAddress || ''
      })
      setToken(storedUserId) // Use user_id as token for auth check
    }
    
    setLoading(false)
  }, [])

  const login = (userData, userId) => {
    const resolvedUsername = userData.username || userData.email || ''
    const resolvedDisplayName = buildDisplayName(userData)
    const resolvedUser = {
      ...userData,
      username: resolvedUsername,
      displayName: resolvedDisplayName
    }

    setUser(resolvedUser)
    setToken(userId) // Use user_id as token for auth check
    localStorage.setItem('user_id', userId)
    localStorage.setItem('username', resolvedUsername)
    if (userData.email) {
      localStorage.setItem('email', userData.email)
    }
    if (userData.firstName) {
      localStorage.setItem('firstName', userData.firstName)
    }
    if (userData.lastName) {
      localStorage.setItem('lastName', userData.lastName)
    }
    localStorage.setItem('display_name', resolvedDisplayName)
    if (userData.wallet_address) {
      localStorage.setItem('wallet_address', userData.wallet_address)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user_id')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('display_name')
    localStorage.removeItem('wallet_address')
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
