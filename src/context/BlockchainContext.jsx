import React, { createContext } from 'react'

export const BlockchainContext = createContext()

export function BlockchainProvider({ children }) {
  const [blocks, setBlocks] = React.useState([])
  const [isValid, setIsValid] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  return (
    <BlockchainContext.Provider value={{
      blocks,
      setBlocks,
      isValid,
      setIsValid,
      loading,
      setLoading,
    }}>
      {children}
    </BlockchainContext.Provider>
  )
}

export function useBlockchain() {
  const context = React.useContext(BlockchainContext)
  if (!context) {
    throw new Error('useBlockchain must be used within BlockchainProvider')
  }
  return context
}
