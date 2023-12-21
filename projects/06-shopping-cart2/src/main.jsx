import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 3. de esta manera proveemos el contexto a toda nuestra app
  <FiltersProvider>
    <App />
  </FiltersProvider>,
)
