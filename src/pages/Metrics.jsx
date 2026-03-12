import { useEffect, useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'
import { blockchainAPI, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import { LoadingSpinner } from '../components/LoadingSpinner'
import '../styles/pages.css'

export function Metrics() {
  const [metrics, setMetrics] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadMetrics = async () => {
    try {
      setLoading(true)
      setError('')
      const [metricsRes, chainRes] = await Promise.all([
        blockchainAPI.getNetworkMetrics(),
        blockchainAPI.getChain(),
      ])
      setMetrics(metricsRes.data || null)
      setBlocks(Array.isArray(chainRes.data) ? chainRes.data : [])
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load metrics'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMetrics()
  }, [])

  const growthSeries = useMemo(() => {
    let txRunning = 0
    return blocks.map((block) => {
      txRunning += Array.isArray(block.transactions) ? block.transactions.length : 0
      return {
        block: block.index,
        transactions: txRunning,
      }
    })
  }, [blocks])

  const snapshotSeries = useMemo(() => {
    if (!metrics) return []
    return [
      { name: 'Total Blocks', value: metrics.total_blocks ?? 0 },
      { name: 'Transactions', value: metrics.total_transactions ?? 0 },
      { name: 'Difficulty', value: metrics.difficulty ?? 0 },
      { name: 'Avg Block Time', value: Number(metrics.average_block_time ?? 0).toFixed(2) },
    ]
  }, [metrics])

  return (
    <div className="dashboard">
      <h1>Network Metrics</h1>
      <p>Operational visibility for blocks, throughput, consensus difficulty, and mining cadence.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={loadMetrics} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Metrics'}
        </button>
      </div>

      <div className="content-grid metrics-grid">
        <Card title="Blockchain Growth">
          <div className="chart-shell" aria-live="polite">
            {loading ? <LoadingSpinner message="Loading metrics charts..." size="sm" /> : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={growthSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(96, 126, 159, 0.25)" />
                <XAxis dataKey="block" stroke="#9db7d1" />
                <YAxis stroke="#9db7d1" />
                <Tooltip />
                <Line type="monotone" dataKey="transactions" stroke="#2dd4bf" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card title="Current Snapshot">
          <div className="chart-shell" aria-live="polite">
            {loading ? <LoadingSpinner message="Loading metrics charts..." size="sm" /> : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={snapshotSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(96, 126, 159, 0.25)" />
                <XAxis dataKey="name" stroke="#9db7d1" />
                <YAxis stroke="#9db7d1" />
                <Tooltip />
                <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Metrics
