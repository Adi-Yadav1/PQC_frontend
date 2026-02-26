import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { LoadingSpinner } from '../components/LoadingSpinner'
import '../styles/pages.css'

export function BlockDetails() {
  const { blockIndex } = useParams()
  const navigate = useNavigate()
  const [block, setBlock] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlock()
  }, [blockIndex])

  const loadBlock = async () => {
    try {
      setLoading(true)
      const response = await blockchainAPI.getChain()
      const blocks = Array.isArray(response.data) ? response.data : response.data.blocks || []
      const foundBlock = blocks.find(b => b.index === parseInt(blockIndex))
      
      if (foundBlock) {
        setBlock(foundBlock)
      }
    } catch (error) {
      console.error('Error loading block:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  
  if (!block) {
    return (
      <div className="block-details-page">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
        <p>Block not found</p>
      </div>
    )
  }

  const transactionColumns = [
    { key: 'sender', label: 'From' },
    { key: 'receiver', label: 'To' },
    { key: 'amount', label: 'Amount' },
    { key: 'timestamp', label: 'Timestamp', render: (val) => new Date(val).toLocaleString() },
  ]

  return (
    <div className="block-details-page">
      <button onClick={() => navigate('/')} className="btn btn-secondary">
        ← Back to Dashboard
      </button>

      <h1>Block #{block.index}</h1>

      <div className="block-details-grid">
        <Card title="Block Information">
          <div className="details-content">
            <div className="detail-row">
              <label>Index:</label>
              <code>{block.index}</code>
            </div>
            
            <div className="detail-row">
              <label>Hash:</label>
              <code className="hash">{block.hash}</code>
            </div>
            
            <div className="detail-row">
              <label>Previous Hash:</label>
              <code className="hash">{block.previous_hash || 'Genesis Block'}</code>
            </div>
            
            <div className="detail-row">
              <label>Timestamp:</label>
              <span>{new Date(block.timestamp).toLocaleString()}</span>
            </div>
            
            <div className="detail-row">
              <label>Transactions Count:</label>
              <span>{block.transactions?.length || 0}</span>
            </div>

            {block.nonce !== undefined && (
              <div className="detail-row">
                <label>Nonce:</label>
                <span>{block.nonce}</span>
              </div>
            )}
          </div>
        </Card>

        {block.transactions && block.transactions.length > 0 && (
          <Card title="Transactions">
            <Table
              columns={transactionColumns}
              data={block.transactions}
            />
          </Card>
        )}

        {(!block.transactions || block.transactions.length === 0) && (
          <Card title="Transactions">
            <p className="no-data">No transactions in this block</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default BlockDetails
