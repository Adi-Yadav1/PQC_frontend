import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id')
    const storedUsername = localStorage.getItem('username')
    const storedWalletAddress = localStorage.getItem('wallet_address')
    
    if (storedUserId && storedUsername) {
      setUser({ 
        id: storedUserId, 
        username: storedUsername,
        wallet_address: storedWalletAddress || ''
      })
      setToken(storedUserId) // Use user_id as token for auth check
    }
    
    setLoading(false)
  }, [])

  const login = (userData, userId) => {
    setUser(userData)
    setToken(userId) // Use user_id as token for auth check
    localStorage.setItem('user_id', userId)
    localStorage.setItem('username', userData.username)
    if (userData.wallet_address) {
      localStorage.setItem('wallet_address', userData.wallet_address)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user_id')
    localStorage.removeItem('username')
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
