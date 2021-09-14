import React from 'react'
import './App.css'
import { UseStockProvider } from './hooks/use-stock-context'
import { Content } from './components/contents'

function App() {
  return (
    <UseStockProvider>
      <Content />
    </UseStockProvider>
  )
}

export default App
