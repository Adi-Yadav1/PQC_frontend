import { useEffect, useState } from 'react'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import { QuantumAttackDiagram } from '../components/QuantumAttackDiagram'
import { Table } from '../components/Table'
import '../styles/pages.css'

export function QuantumThreat() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadComparison = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await blockchainAPI.getCryptoComparison(20)
      setRows(Array.isArray(response.data?.rows) ? response.data.rows : [])
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to load comparison metrics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComparison()
  }, [])

  const columns = [
    { key: 'algorithm', label: 'Algorithm' },
    { key: 'quantum_status', label: 'Quantum Security Status' },
    { key: 'signature_size_bytes', label: 'Signature Size (bytes)' },
    { key: 'verify_time_ms', label: 'Verify Time (ms)' },
  ]

  return (
    <div className="dashboard">
      <h1>Quantum Threat Analysis</h1>
      <p>Understanding why classical cryptography degrades and why post-quantum migration is urgent.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="content-grid">
        <Card title="Threat Progression">
          <QuantumAttackDiagram />
        </Card>

        <Card title="Classical Risk Narrative">
          <p><strong>Quantum Computer</strong></p>
          <p>↓</p>
          <p><strong>Breaks ECDSA</strong></p>
          <p>↓</p>
          <p><strong>Traditional blockchain signatures become forgeable</strong></p>
          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />
          <p>
            With Dilithium (ML-DSA) and Kyber (ML-KEM), this platform transitions to cryptographic
            assumptions designed for the post-quantum era.
          </p>
        </Card>
      </div>

      <Card title="Comparative Metrics">
        {loading ? <p>Loading comparison metrics...</p> : <Table columns={columns} data={rows} />}
      </Card>
    </div>
  )
}

export default QuantumThreat
