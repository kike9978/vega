
import CowGrid from './components/CowGrid'
import CowService from './cow/cow.service'
import { useState } from 'react'
import Dialog from './components/Dialog'
import CowForm from './components/forms/CowForm'
import Button from './components/Button'

const cowService = new CowService()
function App() {
  const [cows, setCows] = useState(cowService.getCows())


  function createCow(cowData) {
    cowService.createCow(cowData)
    setCows(cowService.getCows())
  }


  function onOpenModalClick() {
    document.querySelector("dialog").showModal()
  }
  function handleCreateCow(cowData) {
    createCow(cowData)
  }

  function onPopulateMockClick() {
    const falseCows = [
      {
        name: "Pícaro",
        sex: "male",
        upp: "tacahuite",
        id: 1234,
        breed: "ill",
        isRegistered: true,
        mark: "il"
      },
      {
        name: "Juanelo",
        sex: "male",
        upp: "tacahuite",
        breed: "ill",
        isRegistered: false,
        mark: "il"
      },
      {
        name: "Luna",
        sex: "female",
        upp: "tacahuite",
        id: 3456,
        breed: "ill",
        isRegistered: true,
        mark: "il"
      },
      {
        name: "Serafina",
        sex: "female",
        upp: "tacahuite",
        breed: "ill",
        isRegistered: false,
        mark: "il"
      },
      {
        name: "Manzana",
        sex: "female",
        upp: "tacahuite",
        id: 5678,
        breed: "ill",
        isRegistered: true,
        mark: "il"
      },
      {
        name: "Garroba",
        sex: "female",
        upp: "tacahuite",
        id: 6789,
        breed: "ill",
        isRegistered: true,
        mark: "il"
      },
    ]

    falseCows.forEach(cow => {
      createCow(cow)
    })
  }


  return (
    <>
      <Button onClick={onOpenModalClick} text={"Añadir ganado"} />
      <Button onClick={onPopulateMockClick} text={"Llenar con info de prueba"} />
      <CowGrid cows={cows} />
      <Dialog >
        <CowForm onSubmit={handleCreateCow} />
      </Dialog>
    </>
  )
}

export default App
