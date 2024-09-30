import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route} from 'react-router-dom'
import RegistrationForm from './pages/auth/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<RegistrationForm/>} />
    </Routes>
  )
}

export default App
