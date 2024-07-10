
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

  const date = new Date()
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
    createCow({ ...cowData, id: crypto.randomUUID() })
  }

  function onPopulateMockClick() {
    console.log(Date.parse())
    console.log(`${date.getFullYear()}-${date.getMonth() < 9 ? "0" + date.getMonth() : date.getMonth()}-${date.getDate()}`)
    const falseCows = [
      {
        name: "Pícaro",
        sex: "male",
        upp: "tacahuite",
        id: crypto.randomUUID(),
        breed: "ill",
        isRegistered: true,
        mark: "il",
        birthDate: "2024-06-14",
        hasEaring: true,
        earingId: 432124,

      },
      {
        name: "Juanelo",
        sex: "male",
        upp: "tacahuite",
        id: crypto.randomUUID(),
        breed: "ill",
        isRegistered: false,
        mark: "il",
        birthDate: "2018-06-14",
        hasEaring: true,
        earingId: "",
      },
      {
        name: "Luna",
        sex: "female",
        upp: "tacahuite",
        id: crypto.randomUUID(),
        breed: "ill",
        isRegistered: true,
        mark: "il",
        birthDate: "2022-06-14",
        hasEaring: true,
        earingId: 25,
      },
      {
        name: "Serafina",
        sex: "female",
        upp: "tacahuite",
        id: crypto.randomUUID(),
        breed: "ill",
        isRegistered: false,
        mark: "il",
        birthDate: "2011-06-14",
        hasEaring: true,
        earingId: "",
      },
      {
        name: "Manzana",
        sex: "female",
        upp: "tacahuite",
        id: crypto.randomUUID(),
        breed: "ill",
        isRegistered: true,
        mark: "il",
        birthDate: "2015-06-14",
        hasEaring: true,
        earingId: 23452,
      },
      {
        name: "Garroba",
        sex: "female",
        upp: "tacahuite",
        id: crypto.randomUUID(),
        breed: "ill",
        isRegistered: true,
        mark: "il",
        birthDate: "2012-06-14",
        hasEaring: true,
        earingId: 1235,
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
      <Dialog title={"Registrar ganado"}>
        <CowForm onSubmit={handleCreateCow} />
      </Dialog>
    </>
  )
}

export default App
