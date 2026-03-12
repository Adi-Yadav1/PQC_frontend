import { useState, useEffect, useMemo } from 'react'
import { blockchainAPI, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import '../styles/pages.css'

export function TransactionHistory() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [filterType, filterValue, transactions])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      setError('')
      const walletRef = user?.wallet_address || user?.id

      if (!walletRef) {
        setTransactions([])
        return
      }

      const response = await blockchainAPI.getTransactions(walletRef)
      const rows = Array.isArray(response.data) ? response.data : []
      setTransactions(rows)
    } catch (error) {
      setError(getApiErrorMessage(error, 'Error loading transactions'))
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = () => {
    let filtered = transactions

    if (filterValue.trim()) {
      if (filterType === 'sender') {
        filtered = filtered.filter(tx =>
          String(tx.sender || '').toLowerCase().includes(filterValue.toLowerCase())
        )
      } else if (filterType === 'receiver') {
        filtered = filtered.filter(tx =>
          String(tx.receiver || '').toLowerCase().includes(filterValue.toLowerCase())
        )
      } else if (filterType === 'all') {
        filtered = filtered.filter(tx =>
          String(tx.sender || '').toLowerCase().includes(filterValue.toLowerCase()) ||
          String(tx.receiver || '').toLowerCase().includes(filterValue.toLowerCase())
        )
      }
    }

    setFilteredTransactions(filtered)
  }

  if (loading) return <LoadingSpinner message="Loading transactions..." />

  const columns = useMemo(() => [
    { 
      key: 'sender', 
      label: 'From', 
      render: (val, row) => (
        <div className="user-cell" title={row.sender_address}>
          <strong>{val}</strong>
          {row.sender_address && (
            <small style={{display: 'block', opacity: 0.7}}>
              {row.sender_address.substring(0, 8)}...{row.sender_address.substring(row.sender_address.length - 6)}
            </small>
          )}
        </div>
      )
    },
    { 
      key: 'receiver', 
      label: 'To', 
      render: (val, row) => (
        <div className="user-cell" title={row.receiver_address}>
          <strong>{val}</strong>
          {row.receiver_address && (
            <small style={{display: 'block', opacity: 0.7}}>
              {row.receiver_address.substring(0, 8)}...{row.receiver_address.substring(row.receiver_address.length - 6)}
            </small>
          )}
        </div>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount', 
      render: (val, row) => row.encrypted ? 'ENCRYPTED' : `${val} PQC`
    },
    { key: 'block_index', label: 'Block #' },
    { key: 'timestamp', label: 'Time', render: (val) => new Date(Number(val) * 1000).toLocaleString() },
    { key: 'encrypted', label: 'Encrypted', render: (val) => (val ? 'Yes' : 'No') },
  ], [])

  return (
    <div className="transaction-history-page">
      <h1>Transaction History</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <Card title="Filters">
        <div className="filter-grid">
          <div className="form-group">
            <label htmlFor="filterType">Filter By</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Select transaction filter type"
            >
              <option value="all">All</option>
              <option value="sender">Sender</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filterValue">Search Value</label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Search sender or receiver"
              aria-label="Search transactions"
            />
          </div>
        </div>
      </Card>

      <Card title={`Transactions (${filteredTransactions.length})`}>
        <Table
          columns={columns}
          data={filteredTransactions}
        />
      </Card>
    </div>
  )
}

export default TransactionHistory
