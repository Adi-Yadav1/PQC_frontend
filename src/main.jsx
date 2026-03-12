import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: '#111b31',
          color: '#e6edf8',
          border: '1px solid #24344f',
        },
      }}
    />
    <App />
  </React.StrictMode>,
)
