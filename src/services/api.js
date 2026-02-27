import axios from 'axios'

const API_BASE_URL = 'https://he-future-proof-digital-wallet.onrender.com'

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
    if (error.response?.status === 401) {
      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (username, password) => 
    api.post('/login', { 
      username: username, 
      password: password 
    }),
  register: (username, password) => 
    api.post('/register', { 
      username: username, 
      password: password 
    }),
  getProfile: (userId) => api.get(`/profile/${userId}`),
}

export const blockchainAPI = {
  getChain: () => api.get('/chain'),
  verifyChain: () => api.get('/verify'),
  sendTransaction: (sender, receiver, amount, userId) =>
    api.post('/send_transaction', { 
      sender: sender, 
      receiver: receiver, 
      amount: amount,
      user_id: userId
    }),
  addTransaction: (sender, receiver, amount) =>
    api.post('/add_transaction', { 
      sender: sender, 
      receiver: receiver, 
      amount: amount 
    }),
  getBalance: (userId) => api.get(`/balance/${userId}`),
  mineBlock: () => api.post('/mine'),
}

export default api
