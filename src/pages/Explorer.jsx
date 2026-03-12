import { useEffect, useMemo, useState } from 'react'
import { blockchainAPI, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingSpinner } from '../components/LoadingSpinner'
import '../styles/pages.css'

export function Explorer() {
  const [blocks, setBlocks] = useState([])
  const [verifyInfo, setVerifyInfo] = useState({ valid: null, message: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBlocks = async () => {
    try {
      setLoading(true)
      setError('')
      // Explorer uses simplified block feed for clear presentation output.
      const response = await blockchainAPI.getBlocks()
      setBlocks(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load blocks'))
    } finally {
      setLoading(false)
    }
  }

  const verifyChain = async () => {
    try {
      const response = await blockchainAPI.verifyChain()
      setVerifyInfo({
        valid: !!response.data.valid,
        message: response.data.message || '',
      })
    } catch (err) {
      setVerifyInfo({ valid: false, message: getApiErrorMessage(err, 'Verification failed') })
    }
  }

  useEffect(() => {
    loadBlocks()
  }, [])

  const chainGraph = useMemo(() => {
    if (blocks.length === 0) return 'No blocks yet'
    return blocks.map((b) => `Block${b.index}`).join(' -> ')
  }, [blocks])

  const columns = useMemo(() => [
    { key: 'index', label: 'Block Index' },
    { key: 'hash', label: 'Hash', render: (v) => `${String(v).substring(0, 18)}...` },
    { key: 'previous_hash', label: 'Previous Hash', render: (v) => `${String(v).substring(0, 18)}...` },
    { key: 'miner', label: 'Miner Wallet', render: (v) => v ? `${String(v).substring(0, 10)}...` : 'N/A' },
    { key: 'miner_node', label: 'Miner Node', render: (v) => v ? `${String(v).substring(0, 10)}...` : 'N/A' },
    { key: 'transactions_count', label: 'Transaction Count' },
    { key: 'timestamp', label: 'Timestamp', render: (v) => new Date(Number(v) * 1000).toLocaleString() },
  ], [])

  return (
    <div className="dashboard">
      <h1>Blockchain Explorer</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <Card title="Verification">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={verifyChain} aria-label="Verify blockchain integrity">Verify Blockchain</button>
          {verifyInfo.valid !== null && (
            <StatusBadge
              status={verifyInfo.valid ? 'valid' : 'invalid'}
              text={verifyInfo.valid ? 'Blockchain Valid' : 'Blockchain Invalid'}
            />
          )}
        </div>
        {verifyInfo.message && <p style={{ marginTop: '1rem' }}>{verifyInfo.message}</p>}
      </Card>

      <Card title="Blockchain Graph">
        {/* Simple chain graph gives immediate visual progression for demo narration. */}
        <p style={{ fontFamily: 'monospace', fontSize: '1.05rem' }}>{chainGraph}</p>
      </Card>

      <Card title="Blocks">
        {loading ? <LoadingSpinner message="Loading block explorer data..." /> : <Table columns={columns} data={blocks} />}
      </Card>
    </div>
  )
}

export default Explorer
