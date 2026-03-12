import { useEffect, useState } from 'react'
import { blockchainAPI } from '../services/api'
import { Table } from './Table'

export function TransactionHistory({ walletAddress, refreshToken = 0 }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadTransactions = async () => {
    if (!walletAddress) return

    try {
      setLoading(true)
      setError('')
      // Educational view: show all ledger transactions involving this wallet.
      const response = await blockchainAPI.getTransactions(walletAddress)
      const rows = Array.isArray(response.data) ? response.data : []
      setTransactions(rows)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load transaction history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [walletAddress, refreshToken])

  const columns = [
    { key: 'sender', label: 'Sender' },
    { key: 'receiver', label: 'Receiver' },
    { key: 'amount', label: 'Amount', render: (v) => `${Number(v).toFixed(2)} PQC` },
    {
      key: 'timestamp',
      label: 'Timestamp',
      render: (v) => new Date(Number(v) * 1000).toLocaleString(),
    },
    { key: 'block_index', label: 'Block Index' },
  ]

  if (loading) {
    return <p>Loading transaction history...</p>
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>
  }

  return <Table columns={columns} data={transactions} />
}

export default TransactionHistory
