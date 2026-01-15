import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CareerCoachChat from './chat/componets/chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CareerCoachChat />
    </>
  )
}

export default App
