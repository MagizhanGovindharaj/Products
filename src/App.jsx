import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/:pid" element={<ProductDetails/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App