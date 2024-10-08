import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.js'
import './assets/index.css'
import { root } from 'postcss';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.warn('No root element found.')
}

