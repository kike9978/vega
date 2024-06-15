
import CowGrid from './components/CowGrid'
import CowService from './cow/cow.service'
import { useEffect, useState } from 'react'
import Dialog from './components/Dialog'
import CowForm from './components/forms/CowForm'
import Button from './components/Button'

const cowService = new CowService()
function App() {
  const [cows, setCows] = useState([])
  const [filterText, setFilterText] = useState("")
  const [filterSex, setFilterSex] = useState("")

  useEffect(() => {
    const initialCows = cowService.getCows() || [];
    setCows(initialCows);


  }, [])


  const filteredCowsByText = cows.filter(cow => !(cow.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1))
  const filteredCows = filteredCowsByText.filter(cow => {
    if (!filterSex) {
      return true
    }

    return cow.sex === filterSex
  })

  function handleFilterCows(e) {
    setFilterText(e.target.value)
  }

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
      <input type="text" onChange={(e) => handleFilterCows(e)} value={filterText} />
      <Button text={"Ver vacas"} onClick={() => setFilterSex("female")} />
      <Button text={"Ver toros"} onClick={() => setFilterSex("male")} />
      <Button text={"Limpiar"} onClick={() => setFilterSex("")} />
      <CowGrid cows={filteredCows} />
      <Dialog >
        <CowForm onSubmit={handleCreateCow} />
      </Dialog>
    </>
  )
}

export default App
