import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Card } from '../components/Card'
import { RevealSection } from '../components/RevealSection'
import { useAuth } from '../context/AuthContext'
import '../styles/pages.css'

const technologyRows = [
  { layer: 'Signatures', value: 'ML-DSA (Dilithium)', role: 'Quantum-resistant transaction signing' },
  { layer: 'Encryption', value: 'ML-KEM (Kyber) + AES-GCM', role: 'Private transaction confidentiality' },
  { layer: 'Consensus', value: 'Proof-of-Work', role: 'Immutable block ordering and security' },
  { layer: 'Network', value: 'Distributed peers', role: 'Node synchronization and propagation' },
]

const featureRows = [
  'Public and private transaction flows',
  'Live blockchain explorer with block provenance',
  'Network visibility and operational demo controls',
  'Benchmarking, validation, and research reporting toolkit',
]

export function Home() {
  const { isAuthenticated, loading } = useAuth()

  return (
    <div className="home-page">
      <Helmet>
        <title>PQC Shield Ledger | Post-Quantum Blockchain Platform</title>
        <meta
          name="description"
          content="Explore a production-grade post-quantum blockchain wallet with Dilithium signatures, Kyber encryption, live explorer, metrics, and demo controls."
        />
        <meta property="og:title" content="PQC Shield Ledger" />
        <meta
          property="og:description"
          content="Future-proof blockchain wallet platform with post-quantum cryptography, live dashboard observability, and educational demo workflows."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="hero-kicker">Post-Quantum Security Platform</p>
          <h1>Future-Proof Digital Wallet for Quantum-Safe Blockchain Operations</h1>
          <p>
            A production-style educational platform combining distributed blockchain mining,
            post-quantum signatures, and private transactions with an operator-first dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">Open Dashboard</Link>
            <a href="#about" className="btn btn-secondary">Learn Architecture</a>
          </div>
        </div>
        <Card className="hero-metrics" title="Platform Snapshot">
          <p><strong>Cryptography:</strong> Dilithium + Kyber + AES-GCM</p>
          <p><strong>Operational Scope:</strong> Multi-node blockchain network</p>
          <p><strong>Core Capability:</strong> Quantum-resilient payments and verification</p>
          <p><strong>Audience:</strong> Cybersecurity education and research demos</p>
        </Card>
      </section>

      <RevealSection className="section-block" id="about">
        <h2>About Post-Quantum Blockchain</h2>
        <p>
          Classical cryptography such as ECDSA becomes vulnerable under large-scale quantum
          computation. This platform replaces vulnerable primitives with NIST post-quantum
          algorithms while preserving full blockchain workflows and wallet usability.
        </p>
      </RevealSection>

      <RevealSection className="section-block">
        <h2>Technology Stack</h2>
        <div className="tech-grid">
          {technologyRows.map((row) => (
            <Card key={row.layer} className="hover-lift-card">
              <p className="meta-label">{row.layer}</p>
              <h3>{row.value}</h3>
              <p>{row.role}</p>
            </Card>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-block">
        <h2>Key Features</h2>
        <div className="feature-list-grid">
          {featureRows.map((item) => (
            <Card key={item} className="hover-lift-card">
              <p>{item}</p>
            </Card>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-block">
        <h2>Architecture Overview</h2>
        <div className="architecture-flow">
          <div>User Wallet</div>
          <span>{'->'}</span>
          <div>Dilithium / Kyber Layer</div>
          <span>{'->'}</span>
          <div>Transaction Mempool</div>
          <span>{'->'}</span>
          <div>Proof-of-Work Chain</div>
          <span>{'->'}</span>
          <div>Distributed Nodes</div>
        </div>
      </RevealSection>

      {!loading && !isAuthenticated && (
        <RevealSection className="section-block cta-block">
          <h2>Ready to Explore the Platform?</h2>
          <p>Authenticate, inspect live chain state, run demo controls, and compare cryptographic systems.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Create Account</Link>
            <Link to="/dashboard" className="btn btn-secondary">Go to Dashboard</Link>
          </div>
        </RevealSection>
      )}
    </div>
  )
}

export default Home
