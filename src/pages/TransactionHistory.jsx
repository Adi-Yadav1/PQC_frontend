import { useState, useEffect } from 'react'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { LoadingSpinner } from '../components/LoadingSpinner'
import '../styles/pages.css'

export function TransactionHistory() {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)
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
      const response = await blockchainAPI.getChain()
      const blocks = Array.isArray(response.data) ? response.data : response.data.blocks || []
      
      const allTransactions = []
      blocks.forEach(block => {
        if (block.transactions && Array.isArray(block.transactions)) {
          block.transactions.forEach(tx => {
            allTransactions.push({
              ...tx,
              blockIndex: block.index,
            })
          })
        }
      })
      
      setTransactions(allTransactions)
    } catch (error) {
      console.error('Error loading transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = () => {
    let filtered = transactions

    if (filterValue.trim()) {
      if (filterType === 'sender') {
        filtered = filtered.filter(tx =>
          tx.sender?.toLowerCase().includes(filterValue.toLowerCase())
        )
      } else if (filterType === 'receiver') {
        filtered = filtered.filter(tx =>
          tx.receiver?.toLowerCase().includes(filterValue.toLowerCase())
        )
      } else if (filterType === 'all') {
        filtered = filtered.filter(tx =>
          tx.sender?.toLowerCase().includes(filterValue.toLowerCase()) ||
          tx.receiver?.toLowerCase().includes(filterValue.toLowerCase())
        )
      }
    }

    setFilteredTransactions(filtered)
  }

  if (loading) return <LoadingSpinner />

  const columns = [
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
      render: (val) => `${val} PKC`
    },
    { key: 'blockIndex', label: 'Block #' },
    { key: 'timestamp', label: 'Time', render: (val) => new Date(val * 1000).toLocaleString() },
  ]

  return (
    <div className="transaction-history-page">
      <h1>Transaction History</h1>

      <Card title="Filters">
        <div className="filter-grid">
          <div className="form-group">
            <label htmlFor="filterType">Filter By</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
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
              placeholder="Enter address or wallet"
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
