import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components.css'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unexpected error occurred.',
    }
  }

  componentDidCatch(error, info) {
    console.error('Route rendering error:', error, info)
  }

  resetError = () => {
    this.setState({ hasError: false, errorMessage: '' })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <h2>Something went wrong</h2>
          <p>{this.state.errorMessage}</p>
          <div className="error-boundary-actions">
            <button
              type="button"
              className="btn btn-primary"
              aria-label="Try rendering the page again"
              onClick={this.resetError}
            >
              Try Again
            </button>
            <Link className="btn btn-secondary" to="/" aria-label="Return to home page">
              Back Home
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
