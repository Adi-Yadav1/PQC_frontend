import axios from 'axios'
import { toast } from 'react-hot-toast'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000'
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '')

let lastErrorToastAt = 0
const TOAST_COOLDOWN_MS = 4000

const canShowErrorToast = () => {
  const now = Date.now()
  if (now - lastErrorToastAt < TOAST_COOLDOWN_MS) return false
  lastErrorToastAt = now
  return true
}

export const getApiErrorMessage = (error, fallbackMessage = 'Something went wrong. Please try again.') => {
  return error?.response?.data?.error || fallbackMessage
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add user_id to requests if it exists
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('user_id')
  if (userId) {
    // Add user_id as custom header if your backend needs it
    config.headers['X-User-ID'] = userId
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status

    if (statusCode === 401) {
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      localStorage.removeItem('wallet_address')
      if (!window.location.pathname.startsWith('/login')) {
        toast.error('Session expired. Please log in again.')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }

    if (!error.response) {
      if (canShowErrorToast()) {
        toast.error('Network unavailable. Please check your connection.')
      }
      return Promise.reject(error)
    }

    if (statusCode >= 500 && canShowErrorToast()) {
      toast.error('Server error occurred. Please retry in a moment.')
    }

    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (identity, password) => 
    api.post('/login', { 
      username: identity,
      password,
    }),
  register: (username, password) => 
    api.post('/register', { 
      username,
      password,
    }),
  getProfile: (userId) => api.get(`/profile/${userId}`),
}

export const blockchainAPI = {
  getChain: () => api.get('/chain'),
  getBlocks: () => api.get('/blocks'),
  verifyChain: () => api.get('/verify'),
  getExplorer: () => api.get('/explorer'),
  getDemoStats: () => api.get('/demo_stats'),
  getCryptoInfo: () => api.get('/crypto_info'),
  getCryptoComparison: (runs) =>
    api.get('/crypto_comparison', runs ? { params: { runs } } : undefined),
  sendTransaction: (sender, receiver, amount, userId) =>
    api.post('/send_transaction', { 
      sender: sender, 
      receiver: receiver, 
      amount: amount,
      user_id: userId
    }),
  sendPrivateTransaction: (senderWallet, receiverWallet, amount) =>
    api.post('/private_transaction', {
      sender_wallet: senderWallet,
      receiver_wallet: receiverWallet,
      amount: amount,
    }),
  addTransaction: (sender, receiver, amount) =>
    api.post('/add_transaction', { 
      sender: sender, 
      receiver: receiver, 
      amount: amount 
    }),
  getBalance: (walletAddressOrUserId) => api.get(`/balance/${walletAddressOrUserId}`),
  getTransactions: (walletAddressOrUserId) => api.get(`/transactions/${walletAddressOrUserId}`),
  getNodeInfo: () => api.get('/node_info'),
  getNetwork: () => api.get('/network'),
  getHealth: () => api.get('/health'),
  ping: (nodeId) => api.post('/ping', { node_id: nodeId }),
  resetNetwork: () => api.post('/reset_network'),
  simulateTransactions: (count = 5) => api.post('/simulate_transactions', { count }),
  mineNow: (minerAddress) => api.post('/mine_now', minerAddress ? { miner_address: minerAddress } : {}),
  getNetworkMetrics: () => api.get('/network_metrics'),
  mineBlock: (userId) => api.post('/mine', userId ? { user_id: userId } : {}),
  runDemo: () => api.post('/run_demo'),
}

export default api
