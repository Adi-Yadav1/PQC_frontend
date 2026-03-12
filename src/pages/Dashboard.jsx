import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { blockchainAPI, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { TransactionHistory } from '../components/TransactionHistory'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { StatusBadge } from '../components/StatusBadge'
import '../styles/pages.css'

export function Dashboard() {
  const { user } = useAuth()
  const [blocks, setBlocks] = useState([])
  const [balance, setBalance] = useState(0)
  const [verifyState, setVerifyState] = useState({ valid: null, message: '' })
  const [demoStats, setDemoStats] = useState(null)
  const [explorerStats, setExplorerStats] = useState(null)
  const [cryptoInfo, setCryptoInfo] = useState(null)
  const [networkMetrics, setNetworkMetrics] = useState(null)
  const [txForm, setTxForm] = useState({ receiver: '', amount: '', isPrivate: false })
  const [alert, setAlert] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)
  const [mining, setMining] = useState(false)
  const [sending, setSending] = useState(false)
  const [runningDemo, setRunningDemo] = useState(false)
  const [demoResult, setDemoResult] = useState(null)
  const [txRefreshToken, setTxRefreshToken] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    loadData()

    // Demo polling keeps balance and network activity visibly updated during presentation.
    const timer = setInterval(() => {
      loadData(false)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const loadData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true)

      const walletAddress = user?.wallet_address || user?.id
      const [chainRes, verifyRes, balanceRes, demoStatsRes, explorerRes, cryptoRes, metricsRes] = await Promise.all([
        blockchainAPI.getChain(),
        blockchainAPI.verifyChain(),
        walletAddress ? blockchainAPI.getBalance(walletAddress) : Promise.resolve({ data: { balance: 0 } }),
        blockchainAPI.getDemoStats(),
        blockchainAPI.getExplorer(),
        blockchainAPI.getCryptoInfo(),
        blockchainAPI.getNetworkMetrics(),
      ])

      const chainData = Array.isArray(chainRes.data) ? chainRes.data : []
      setBlocks(chainData)
      setVerifyState({ valid: verifyRes.data.valid, message: verifyRes.data.message || '' })
      setBalance(Number(balanceRes.data.balance || 0))
      setDemoStats(demoStatsRes.data)
      setExplorerStats(explorerRes.data)
      setCryptoInfo(cryptoRes.data)
      setNetworkMetrics(metricsRes.data)
      setTxRefreshToken((prev) => prev + 1)
    } catch (error) {
      setAlert({ type: 'error', text: getApiErrorMessage(error, 'Network error while loading dashboard') })
    } finally {
      if (showLoader) setLoading(false)
    }
  }

  const onTxInputChange = (e) => {
    setTxForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitTransaction = async (e) => {
    e.preventDefault()
    setSending(true)
    setAlert({ type: '', text: '' })

    try {
      if (txForm.isPrivate) {
        await blockchainAPI.sendPrivateTransaction(
          user?.wallet_address,
          txForm.receiver,
          Number(txForm.amount),
        )
        setAlert({ type: 'success', text: '🔒 Private transaction sent' })
        toast.success('Private transaction submitted successfully')
      } else {
        const response = await blockchainAPI.sendTransaction(
          user?.wallet_address,
          txForm.receiver,
          Number(txForm.amount),
          user?.id,
        )
        setAlert({ type: 'success', text: response.data.message || 'Transaction sent successfully' })
        toast.success('Transaction submitted successfully')
      }

      setTxForm({ receiver: '', amount: '', isPrivate: false })
      await loadData(false)
      setTxRefreshToken((prev) => prev + 1)
    } catch (error) {
      setAlert({ type: 'error', text: getApiErrorMessage(error, 'Invalid transaction') })
    } finally {
      setSending(false)
    }
  }

  const mineBlock = async () => {
    setMining(true)
    setAlert({ type: '', text: '' })

    try {
      const response = await blockchainAPI.mineBlock(user?.id)
      const mined = response.data.block || {}
      setAlert({
        type: 'success',
        text: `Block mined successfully. Block index: ${mined.index}. Reward received: 50 PQC`,
      })
      toast.success('Mining completed successfully')
      await loadData(false)
      setTxRefreshToken((prev) => prev + 1)
    } catch (error) {
      setAlert({ type: 'error', text: getApiErrorMessage(error, 'Mining failure') })
    } finally {
      setMining(false)
    }
  }

  const runDemoFlow = async () => {
    setRunningDemo(true)
    setAlert({ type: '', text: '' })

    try {
      const response = await blockchainAPI.runDemo()
      setDemoResult(response.data)
      setAlert({ type: 'success', text: 'Demo flow executed successfully' })
      await loadData(false)
      setTxRefreshToken((prev) => prev + 1)
    } catch (error) {
      setAlert({ type: 'error', text: getApiErrorMessage(error, 'Demo flow failed') })
    } finally {
      setRunningDemo(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const blocksArray = Array.isArray(blocks) ? blocks : []
  const latestBlocks = [...blocksArray].reverse().slice(0, 5)

  const blockColumns = [
    { key: 'index', label: 'Block Index' },
    { key: 'hash', label: 'Hash', render: (val) => `${String(val).substring(0, 14)}...` },
    { key: 'miner', label: 'Miner', render: (val) => val ? `${String(val).substring(0, 10)}...` : 'N/A' },
  ]

  return (
    <div className="dashboard">
      <div className="alert alert-info">
        <strong>PQC Blockchain Demo Mode</strong> | Difficulty: 3 | Block Reward: 50 PQC
      </div>

      <h1>Post-Quantum Blockchain Dashboard</h1>

      {alert.text && (
        <div className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {alert.text}
        </div>
      )}

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Wallet Address</p>
            <p className="stat-value" style={{ fontSize: '1rem', wordBreak: 'break-all' }}>
              {user?.wallet_address || 'Unavailable'}
            </p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Balance</p>
            <p className="stat-value">{balance.toFixed(2)} PQC</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Blockchain Status</p>
            <div className="stat-badge">
              {verifyState.valid !== null && (
                <StatusBadge
                  status={verifyState.valid ? 'valid' : 'invalid'}
                  text={verifyState.valid ? 'Blockchain Valid' : 'Blockchain Invalid'}
                />
              )}
            </div>
            {verifyState.message && <p style={{ marginTop: '0.5rem' }}>{verifyState.message}</p>}
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Network Activity</p>
            <p className="stat-value">{explorerStats?.pending_transactions ?? 0}</p>
            <p>Pending Transactions</p>
          </div>
        </Card>
      </div>

      <div className="content-grid">
        <Card title="Send Transaction">
          <form onSubmit={submitTransaction}>
            <div className="form-group">
              <label htmlFor="receiver">Receiver Wallet Address</label>
              <input
                id="receiver"
                name="receiver"
                value={txForm.receiver}
                onChange={onTxInputChange}
                placeholder="Enter receiver wallet address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount (PQC)</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={txForm.amount}
                onChange={onTxInputChange}
                placeholder="Amount"
                required
              />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id="isPrivate"
                name="isPrivate"
                type="checkbox"
                checked={Boolean(txForm.isPrivate)}
                onChange={(e) => setTxForm((prev) => ({ ...prev, isPrivate: e.target.checked }))}
              />
              <label htmlFor="isPrivate">Private Transaction</label>
            </div>
            <button className="btn btn-primary" disabled={sending} aria-label="Send transaction">
              {sending ? 'Sending...' : 'Send PQC'}
            </button>
          </form>
        </Card>

        <Card title="Mine Block">
          <p>Mine a new block to confirm transactions and collect a 50 PQC reward.</p>
          <button className="btn btn-success" onClick={mineBlock} disabled={mining} aria-label="Mine block">
            {mining ? 'Mining...' : 'Mine Block'}
          </button>
        </Card>

        <Card title="Blockchain Activity">
          <Table
            columns={blockColumns}
            data={latestBlocks}
            onRowClick={(block) => navigate(`/block/${block.index}`)}
          />
        </Card>

        <Card title="Your Transaction History">
          <TransactionHistory walletAddress={user?.wallet_address} refreshToken={txRefreshToken} />
        </Card>

        <Card title="Demo Statistics">
          <p><strong>Total Blocks:</strong> {demoStats?.total_blocks ?? 0}</p>
          <p><strong>Total Transactions:</strong> {demoStats?.total_transactions ?? 0}</p>
          <p><strong>Total Wallets:</strong> {demoStats?.total_wallets ?? 0}</p>
          <p><strong>Total Coins:</strong> {demoStats?.total_coins ?? 0}</p>
          <p><strong>Last Block Index:</strong> {Math.max((demoStats?.total_blocks ?? 1) - 1, 0)}</p>
          <p><strong>Network Difficulty:</strong> {explorerStats?.network_difficulty ?? 3}</p>
        </Card>

        <Card title="Network Metrics">
          {/* Metrics are pulled from a dedicated endpoint for presentation dashboards. */}
          <p><strong>Total Nodes:</strong> {networkMetrics?.total_nodes ?? 1}</p>
          <p><strong>Total Blocks:</strong> {networkMetrics?.total_blocks ?? 0}</p>
          <p><strong>Total Transactions:</strong> {networkMetrics?.total_transactions ?? 0}</p>
          <p><strong>Difficulty:</strong> {networkMetrics?.difficulty ?? 3}</p>
          <p><strong>Average Block Time:</strong> {Number(networkMetrics?.average_block_time ?? 0).toFixed(2)} sec</p>
        </Card>

        <Card title="Quantum-Resistant Cryptography">
          <p><strong>Signature Algorithm:</strong> {cryptoInfo?.signature_algorithm || 'ML-DSA (Dilithium2)'}</p>
          <p><strong>Library:</strong> {cryptoInfo?.library || 'pqcrypto'}</p>
          <p><strong>Quantum Resistant:</strong> {cryptoInfo?.quantum_resistant ? 'Yes' : 'No'}</p>
          <p>
            This blockchain uses NIST Post-Quantum Cryptography instead of classical ECDSA.
          </p>
        </Card>

        <Card title="Demo Flow Automation">
          <p>Run the complete scripted demonstration from the UI.</p>
          <button className="btn btn-secondary" onClick={runDemoFlow} disabled={runningDemo} aria-label="Run backend demo flow">
            {runningDemo ? 'Running Demo...' : 'Run Demo Flow'}
          </button>
          {demoResult && (
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Status:</strong> {demoResult.message || 'Completed'}</p>
              <p><strong>Block Hash:</strong> {demoResult.block_hash ? `${demoResult.block_hash.substring(0, 16)}...` : 'N/A'}</p>
            </div>
          )}
        </Card>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={() => loadData(false)} aria-label="Refresh dashboard data">
          Refresh Data
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/explorer')} aria-label="Open blockchain explorer page">
          Open Explorer
        </button>
      </div>
    </div>
  )
}

export default Dashboard
