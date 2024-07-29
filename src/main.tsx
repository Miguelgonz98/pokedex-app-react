import React from 'react'
import ReactDOM from 'react-dom/client'
import { PokedexApp } from './PokedexApp'
import './assets/styles/base/_reset.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PokedexApp />
  </React.StrictMode>,
)
