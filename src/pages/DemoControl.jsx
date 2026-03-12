import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { blockchainAPI, getApiErrorMessage } from '../services/api'
import { Card } from '../components/Card'
import '../styles/pages.css'

export function DemoControl() {
  const [simCount, setSimCount] = useState(5)
  const [status, setStatus] = useState({ type: '', text: '' })
  const [busyAction, setBusyAction] = useState('')

  const runAction = async (actionName, actionFn, successText) => {
    try {
      setBusyAction(actionName)
      setStatus({ type: '', text: '' })
      await actionFn()
      // Short confirmation text is easier to narrate during presentations.
      setStatus({ type: 'success', text: successText })
      toast.success(successText)
    } catch (error) {
      setStatus({
        type: 'error',
        text: getApiErrorMessage(error, `${actionName} failed`),
      })
    } finally {
      setBusyAction('')
    }
  }

  return (
    <div className="dashboard">
      <h1>Demo Control Panel</h1>
      <p>Use these controls to quickly drive live classroom blockchain scenarios.</p>

      {status.text && (
        <div className={`alert ${status.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {status.text}
        </div>
      )}

      <div className="content-grid">
        <Card title="Reset Network">
          <p>Clears persisted chain and ledger state, then regenerates genesis block.</p>
          <button
            className="btn btn-secondary"
            disabled={busyAction === 'reset'}
            aria-label="Reset blockchain network"
            onClick={() => runAction('reset', () => blockchainAPI.resetNetwork(), 'Network reset successfully')}
          >
            {busyAction === 'reset' ? 'Resetting...' : 'Reset Network'}
          </button>
        </Card>

        <Card title="Simulate Transactions">
          <p>Generate random signed wallet-to-wallet transfers for demo traffic.</p>
          <div className="form-group">
            <label htmlFor="sim-count">Transaction Count</label>
            <input
              id="sim-count"
              type="number"
              min="1"
              max="50"
              value={simCount}
              onChange={(e) => setSimCount(Number(e.target.value || 1))}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={busyAction === 'simulate'}
            aria-label="Simulate transactions"
            onClick={() => runAction(
              'simulate',
              () => blockchainAPI.simulateTransactions(simCount),
              `Simulation completed for ${simCount} transactions`,
            )}
          >
            {busyAction === 'simulate' ? 'Simulating...' : 'Simulate Transactions'}
          </button>
        </Card>

        <Card title="Mine Block Now">
          <p>Triggers immediate mining, even if there are no pending transactions.</p>
          <button
            className="btn btn-success"
            disabled={busyAction === 'mine'}
            aria-label="Mine block immediately"
            onClick={() => runAction('mine', () => blockchainAPI.mineNow(), 'Mining started')}
          >
            {busyAction === 'mine' ? 'Mining...' : 'Mine Block'}
          </button>
        </Card>

        <Card title="Run Demo Script">
          <p>Executes the built-in backend demonstration flow for rapid walkthroughs.</p>
          <button
            className="btn btn-secondary"
            disabled={busyAction === 'demo'}
            aria-label="Run scripted demo flow"
            onClick={() => runAction('demo', () => blockchainAPI.runDemo(), 'Demo flow executed successfully')}
          >
            {busyAction === 'demo' ? 'Running...' : 'Run Demo Script'}
          </button>
        </Card>
      </div>
    </div>
  )
}

export default DemoControl
