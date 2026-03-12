import { useEffect, useMemo, useState } from 'react'
import { blockchainAPI, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { StatusBadge } from '../components/StatusBadge'
import { NetworkGraph } from '../components/NetworkGraph'
import { LoadingSpinner } from '../components/LoadingSpinner'
import '../styles/pages.css'

export function Network() {
  const [health, setHealth] = useState(null)
  const [nodeInfo, setNodeInfo] = useState(null)
  const [networkInfo, setNetworkInfo] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [healthRes, nodeRes, networkRes, blocksRes] = await Promise.all([
        blockchainAPI.getHealth(),
        blockchainAPI.getNodeInfo(),
        blockchainAPI.getNetwork(),
        blockchainAPI.getBlocks(),
      ])

      setHealth(healthRes.data || null)
      setNodeInfo(nodeRes.data || null)
      setNetworkInfo(networkRes.data || null)
      setBlocks(Array.isArray(blocksRes.data) ? blocksRes.data : [])
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load network information'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const latestBlock = useMemo(() => {
    if (!blocks.length) return null
    return blocks[blocks.length - 1]
  }, [blocks])

  const connectedNodes = useMemo(() => {
    if (typeof networkInfo?.connected_nodes === 'number') return networkInfo.connected_nodes
    if (typeof health?.peer_count === 'number') return health.peer_count + 1
    return 1
  }, [networkInfo, health])

  const networkColumns = useMemo(() => [
    { key: 'node', label: 'Node' },
    { key: 'role', label: 'Role' },
    { key: 'connected', label: 'Connected', render: (v) => (v ? 'Yes' : 'No') },
  ], [])

  const networkRows = useMemo(() => {
    if (!nodeInfo) return []
    const rows = [
      { node: `${nodeInfo.host}:${nodeInfo.port}`, role: 'Current Node', connected: true },
    ]

    const peers = Array.isArray(nodeInfo.peers) ? nodeInfo.peers : []
    peers.forEach((peer) => {
      rows.push({ node: peer, role: 'Peer', connected: true })
    })
    return rows
  }, [nodeInfo])

  if (loading && !nodeInfo) {
    return <LoadingSpinner message="Loading network stats..." />
  }

  return (
    <div className="dashboard">
      <h1>Network Monitor</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Node ID</div>
            <div className="stat-value" style={{ fontSize: '1rem' }}>
              {loading ? 'Loading...' : nodeInfo?.node_id?.slice(0, 12) || 'N/A'}
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Connected Nodes</div>
            <div className="stat-value">
              {loading ? '...' : connectedNodes}
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Local Block Height</div>
            <div className="stat-value">
              {loading ? '...' : (nodeInfo?.block_height ?? 0)}
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-label">Pending Transactions</div>
            <div className="stat-value">
              {loading ? '...' : (nodeInfo?.pending_transactions ?? 0)}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Network Topology">
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={loadData} aria-label="Refresh network data">Refresh</button>
          <StatusBadge
            status={(networkInfo?.peer_count || 0) > 0 ? 'valid' : 'warning'}
            text={(networkInfo?.peer_count || 0) > 0 ? 'Peers Connected' : 'Running in Single Node Mode'}
          />
        </div>
        <NetworkGraph nodeInfo={nodeInfo} networkInfo={networkInfo} />
        <Table columns={networkColumns} data={networkRows} />
      </Card>

      <Card title="Node Health Dashboard">
        <div className="details-content">
          <div className="detail-row">
            <label>Node Health</label>
            <span>
              <StatusBadge
                status={health?.status === 'ok' ? 'valid' : 'warning'}
                text={health?.status === 'ok' ? 'Healthy' : 'Unknown'}
              />
            </span>
          </div>
          <div className="detail-row">
            <label>Block Height</label>
            <span>{health?.block_height ?? 0}</span>
          </div>
          <div className="detail-row">
            <label>Peers</label>
            <span>{health?.peer_count ?? 0}</span>
          </div>
          <div className="detail-row">
            <label>Pending Transactions</label>
            <span>{health?.pending_transactions ?? 0}</span>
          </div>
        </div>
      </Card>

      <Card title="Latest Block Provenance">
        {!latestBlock ? (
          <p>No blocks mined yet.</p>
        ) : (
          <div className="details-content">
            <div className="detail-row">
              <label>Index</label>
              <span>{latestBlock.index}</span>
            </div>
            <div className="detail-row">
              <label>Miner Address</label>
              <span>{latestBlock.miner || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <label>Miner Node</label>
              <span>{latestBlock.miner_node || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <label>Hash</label>
              <code>{latestBlock.hash}</code>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Network
