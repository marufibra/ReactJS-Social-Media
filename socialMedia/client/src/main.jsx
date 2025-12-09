import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeContextProvider } from './Context/DarkModeContextProvider.jsx'
import { AuthContextProvider } from './Context/AuthContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>,
)
