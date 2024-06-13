
import './App.css'
import CowService from './cow/cow.service'
import CowCard from './components/CowCard'
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
      {cows && cows.map(cow => {
        return (
          <CowCard
            key={cow.id}
            id={cow.id}
            name={cow.name}
            birthDate={cow.birthDate}
            isRegistered={cow.isRegistered}
            mark={cow.mark}
            opp={cow.opp} />
        )
      })}
    </>
  )
}

export default App
