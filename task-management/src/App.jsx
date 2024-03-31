import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Allroutes } from './components/Routes/Allroutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Allroutes/>
      
    </>
  )
}

export default App
