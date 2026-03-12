import { useEffect, useState } from 'react'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import '../styles/pages.css'

export function CryptographyInfo() {
  const [cryptoInfo, setCryptoInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await blockchainAPI.getCryptoInfo()
      setCryptoInfo(response.data || null)
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch cryptography details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="dashboard">
      <h1>Cryptography Info</h1>
      <p>Core primitives that secure signatures, confidentiality, and data integrity against quantum threats.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="content-grid">
        <Card title="Algorithm Stack">
          {loading ? (
            <p>Loading cryptography profile...</p>
          ) : (
            <div className="details-content">
              <div className="detail-row">
                <label>ML-DSA</label>
                <span>{cryptoInfo?.signature_algorithm || 'ML-DSA (Dilithium)'}</span>
              </div>
              <div className="detail-row">
                <label>ML-KEM</label>
                <span>{cryptoInfo?.encryption_algorithm || 'ML-KEM (Kyber)'}</span>
              </div>
              <div className="detail-row">
                <label>AES-GCM</label>
                <span>Authenticated symmetric layer for encrypted payload confidentiality</span>
              </div>
              <div className="detail-row">
                <label>Signature Size</label>
                <span>{cryptoInfo?.signature_size_bytes || 'N/A'} bytes</span>
              </div>
              <div className="detail-row">
                <label>Quantum Resistant</label>
                <span>{cryptoInfo?.quantum_resistant ? 'Yes' : 'No'}</span>
              </div>
            </div>
          )}
        </Card>

        <Card title="Why This Matters">
          <p>
            Classical public-key systems such as ECDSA rely on discrete logarithm assumptions that
            are vulnerable to Shor's algorithm on fault-tolerant quantum computers.
          </p>
          <p>
            ML-DSA and ML-KEM are NIST-selected post-quantum standards designed to withstand
            known quantum attack strategies while preserving practical deployment characteristics.
          </p>
          <p>
            This platform combines those primitives with authenticated encryption to protect
            signatures, key exchange, and private transaction metadata end-to-end.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default CryptographyInfo
