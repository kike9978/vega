
import './App.css'
import CowGrid from './components/CowGrid'
import CowService from './cow/cow.service'
import { useState } from 'react'

const cowService = new CowService()
function App() {
  const [cows, setCows] = useState(cowService.getCows())


  function createCow() {
    cowService.createCow({ name: "Lola", id: 1234, birthDate: "10 de mayo", opp: "tacahuite", mark: "IL", isRegistered: true })
    setCows(cowService.getCows())
  }

  return (
    <>
      <button onClick={createCow}> crea vaca</button>
      <CowGrid cows={cows} />
    </>
  )
}

export default App
