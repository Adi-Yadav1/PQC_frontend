import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { StatusBadge } from '../components/StatusBadge'
import '../styles/pages.css'

export function Dashboard() {
  const [blocks, setBlocks] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isValid, setIsValid] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const chainRes = await blockchainAPI.getChain()
      const verifyRes = await blockchainAPI.verifyChain()
      
      const chainData = chainRes.data
      setBlocks(Array.isArray(chainData) ? chainData : chainData.blocks || [])
      setIsValid(verifyRes.data.valid)
      
      // Extract transactions from all blocks
      const allTransactions = []
      const blocksArray = Array.isArray(chainData) ? chainData : chainData.blocks || []
      blocksArray.forEach(block => {
        if (block.transactions && Array.isArray(block.transactions)) {
          allTransactions.push(...block.transactions)
        }
      })
      setTransactions(allTransactions.slice(0, 10))
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const blocksArray = Array.isArray(blocks) ? blocks : []
  const latestBlocks = [...blocksArray].reverse().slice(0, 5)

  const blockColumns = [
    { key: 'index', label: 'Index' },
    { key: 'hash', label: 'Hash', render: (val) => val?.substring(0, 16) + '...' },
    { key: 'timestamp', label: 'Timestamp', render: (val) => new Date(val).toLocaleString() },
  ]

  const transactionColumns = [
    { key: 'sender', label: 'From' },
    { key: 'receiver', label: 'To' },
    { key: 'amount', label: 'Amount' },
    { key: 'timestamp', label: 'Time', render: (val) => new Date(val).toLocaleString() },
  ]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Blocks</p>
            <p className="stat-value">{blocksArray.length}</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Transactions</p>
            <p className="stat-value">{transactions.length}</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Blockchain Status</p>
            <div className="stat-badge">
              {isValid !== null && (
                <StatusBadge status={isValid ? 'valid' : 'invalid'} text={isValid ? 'Valid' : 'Invalid'} />
              )}
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Network Status</p>
            <StatusBadge status="valid" text="Online" />
          </div>
        </Card>
      </div>

      <div className="content-grid">
        <Card title="Latest Blocks">
          <Table
            columns={blockColumns}
            data={latestBlocks}
            onRowClick={(block) => navigate(`/block/${block.index}`)}
          />
        </Card>

        <Card title="Latest Transactions">
          <Table
            columns={transactionColumns}
            data={transactions.slice(0, 5)}
          />
        </Card>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={loadData}>
          Refresh Data
        </button>
      </div>
    </div>
  )
}

export default Dashboard
