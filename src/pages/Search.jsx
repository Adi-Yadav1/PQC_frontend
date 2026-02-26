import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { blockchainAPI } from '../services/api'
import { Card } from '../components/Card'
import { Table } from '../components/Table'
import { LoadingSpinner } from '../components/LoadingSpinner'
import '../styles/pages.css'

export function Search() {
  const [searchType, setSearchType] = useState('block-index')
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [allBlocks, setAllBlocks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadAllBlocks()
  }, [])

  const loadAllBlocks = async () => {
    try {
      const response = await blockchainAPI.getChain()
      const blocks = Array.isArray(response.data) ? response.data : response.data.blocks || []
      setAllBlocks(blocks)
    } catch (error) {
      console.error('Error loading blocks:', error)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchValue.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      let searchResults = []

      if (searchType === 'block-index') {
        const index = parseInt(searchValue)
        searchResults = allBlocks.filter(b => b.index === index)
      } else if (searchType === 'block-hash') {
        searchResults = allBlocks.filter(b =>
          b.hash?.toLowerCase().includes(searchValue.toLowerCase())
        )
      } else if (searchType === 'wallet-address') {
        // Search for wallet address in transactions
        const transactions = []
        allBlocks.forEach(block => {
          if (block.transactions) {
            block.transactions.forEach(tx => {
              if (
                tx.sender?.toLowerCase().includes(searchValue.toLowerCase()) ||
                tx.receiver?.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                transactions.push({
                  ...tx,
                  blockIndex: block.index,
                })
              }
            })
          }
        })
        setResults(transactions)
        setLoading(false)
        return
      }

      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const blockColumns = [
    { key: 'index', label: 'Index' },
    { key: 'hash', label: 'Hash', render: (val) => val?.substring(0, 20) + '...' },
    { key: 'timestamp', label: 'Timestamp', render: (val) => new Date(val).toLocaleString() },
  ]

  const transactionColumns = [
    { key: 'sender', label: 'From' },
    { key: 'receiver', label: 'To' },
    { key: 'amount', label: 'Amount' },
    { key: 'blockIndex', label: 'Block' },
  ]

  const renderResults = () => {
    if (!searched) {
      return <p className="no-data">Enter search criteria and click Search</p>
    }

    if (loading) {
      return <LoadingSpinner />
    }

    if (results.length === 0) {
      return <p className="no-data">No results found</p>
    }

    if (searchType === 'wallet-address') {
      return (
        <Table
          columns={transactionColumns}
          data={results}
        />
      )
    }

    return (
      <Table
        columns={blockColumns}
        data={results}
        onRowClick={(block) => navigate(`/block/${block.index}`)}
      />
    )
  }

  return (
    <div className="search-page">
      <h1>Search Blockchain</h1>

      <Card title="Search">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="searchType">Search Type</label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value)
                  setResults([])
                  setSearched(false)
                }}
              >
                <option value="block-index">Block Index</option>
                <option value="block-hash">Block Hash</option>
                <option value="wallet-address">Wallet Address</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="searchValue">Search Value</label>
              <input
                type="text"
                id="searchValue"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === 'block-index'
                    ? 'Enter block number'
                    : searchType === 'block-hash'
                    ? 'Enter block hash'
                    : 'Enter wallet address'
                }
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </form>
      </Card>

      <Card title={`Results ${results.length > 0 ? `(${results.length})` : ''}`}>
        {renderResults()}
      </Card>
    </div>
  )
}

export default Search
