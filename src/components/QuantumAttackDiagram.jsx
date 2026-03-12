import '../styles/pages.css'

export function QuantumAttackDiagram() {
  return (
    <div className="attack-diagram-grid">
      <div className="attack-column attack-risk">
        <h3>Classical Path (Risk)</h3>
        <div className="attack-node">Quantum Computer</div>
        <div className="attack-arrow">↓ Breaks ↓</div>
        <div className="attack-node">ECDSA</div>
        <div className="attack-arrow">↓ Leads To ↓</div>
        <div className="attack-node attack-node-danger">Blockchain Compromised</div>
      </div>

      <div className="attack-column attack-safe">
        <h3>Post-Quantum Path (Resilience)</h3>
        <div className="attack-node">Quantum Computer</div>
        <div className="attack-arrow">↓ Cannot Efficiently Break ↓</div>
        <div className="attack-node">Dilithium / Kyber</div>
        <div className="attack-arrow">↓ Result ↓</div>
        <div className="attack-node attack-node-safe">Blockchain Integrity Preserved</div>
      </div>
    </div>
  )
}

export default QuantumAttackDiagram
