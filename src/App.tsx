import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import RegistrationForm from './pages/auth/register'
import LoginPage from './pages/auth/login'
import ProductsPage from './pages/product/products'

function App() {
 

  return (
    <Routes>
      <Route path='/' element={<ProductsPage/>} />
      <Route path='/register' element={<RegistrationForm/>} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
  )
}

export default App
