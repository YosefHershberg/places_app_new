import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Providers from './components/Providers.tsx';
import { ReactQueryDevtools } from 'react-query/devtools'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </Providers>
  </React.StrictMode>,
)
