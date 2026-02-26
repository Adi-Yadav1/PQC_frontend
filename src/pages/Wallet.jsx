import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import '../styles/pages.css'

export function Wallet() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({ sender: user?.wallet_address || '', receiver: '', amount: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user?.wallet_address || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddTransaction = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await blockchainAPI.addTransaction(
        formData.sender,
        formData.receiver,
        parseFloat(formData.amount)
      )
      setMessage('Transaction added successfully')
      setFormData(prev => ({ ...prev, receiver: '', amount: '' }))
    } catch (error) {
      setMessage(error.response?.data?.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  const handleMineBlock = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await blockchainAPI.mineBlock()
      setMessage(`Block mined! Hash: ${response.data.block?.hash}`)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Mining failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wallet-page">
      <h1>Wallet Dashboard</h1>

      <div className="wallet-grid">
        <Card title="Wallet Information" className="wallet-info">
          <div className="wallet-address-section">
            <label>Your Wallet Address:</label>
            <div className="wallet-address-display">
              <code>{user?.wallet_address}</code>
              <button
                onClick={handleCopyAddress}
                className="btn btn-secondary btn-sm"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div className="wallet-info-item">
            <label>Username:</label>
            <p>{user?.username}</p>
          </div>
        </Card>

        <Card title="Send Transaction">
          {message && (
            <div className={`alert ${message.includes('failed') ? 'alert-error' : 'alert-success'}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleAddTransaction}>
            <div className="form-group">
              <label htmlFor="sender">From (Your Address)</label>
              <input
                type="text"
                id="sender"
                name="sender"
                value={formData.sender}
                readOnly
                className="input-readonly"
              />
            </div>

            <div className="form-group">
              <label htmlFor="receiver">To (Receiver Address)</label>
              <input
                type="text"
                id="receiver"
                name="receiver"
                value={formData.receiver}
                onChange={handleChange}
                placeholder="Enter receiver address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                step="0.01"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Send Transaction'}
            </button>
          </form>
        </Card>

        <Card title="Mining">
          <p className="mining-info">
            Mine the next block and confirm all pending transactions.
          </p>
          
          <button
            onClick={handleMineBlock}
            className="btn btn-success btn-block"
            disabled={loading}
          >
            {loading ? 'Mining...' : '⛏️ Mine Block'}
          </button>
        </Card>
      </div>
    </div>
  )
}

export default Wallet
