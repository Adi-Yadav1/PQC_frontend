import { useEffect, useMemo, useState } from 'react'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { QuantumAttackDiagram } from '../components/QuantumAttackDiagram'
import '../styles/pages.css'

const fmt = (value) => (value === null || value === undefined ? 'N/A' : value)

export function CryptoComparison() {
  const [rows, setRows] = useState([])
  const [runs, setRuns] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadComparison = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await blockchainAPI.getCryptoComparison(runs)
      setRows(Array.isArray(response.data?.rows) ? response.data.rows : [])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load crypto comparison metrics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComparison()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useMemo(() => [
    { key: 'algorithm', label: 'Algorithm' },
    { key: 'key_size_bytes', label: 'Key Size (bytes)', render: (v) => fmt(v) },
    { key: 'signature_size_bytes', label: 'Signature Size (bytes)', render: (v) => fmt(v) },
    { key: 'verify_time_ms', label: 'Verify Time (ms)', render: (v) => fmt(v) },
    { key: 'encryption_time_ms', label: 'Encryption Time (ms)', render: (v) => fmt(v) },
  ], [])

  return (
    <div className="dashboard crypto-comparison-page">
      <h1>Why Post-Quantum Cryptography Is Necessary</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <Card title="Educational Summary">
        <p>
          Classical blockchains typically rely on ECDSA signatures. A sufficiently capable
          quantum computer running Shor&apos;s algorithm can recover private keys from public keys,
          enabling transaction forgery. This system uses Dilithium (ML-DSA) and Kyber (ML-KEM)
          to protect signature and encryption workflows against known quantum attack models.
        </p>
      </Card>

      <Card title="Quantum Attack Visualization">
        <QuantumAttackDiagram />
      </Card>

      <Card title="Classical vs Post-Quantum Metrics">
        <div className="comparison-toolbar">
          <label htmlFor="runs-input">Measurement Runs</label>
          <input
            id="runs-input"
            type="number"
            min="1"
            max="200"
            value={runs}
            onChange={(e) => setRuns(Math.max(1, Math.min(200, Number(e.target.value) || 1)))}
          />
          <button className="btn btn-primary" onClick={loadComparison} disabled={loading}>
            {loading ? 'Measuring...' : 'Refresh Comparison'}
          </button>
        </div>

        {loading ? <p>Loading comparison metrics...</p> : <Table columns={columns} data={rows} />}
      </Card>
    </div>
  )
}

export default CryptoComparison
