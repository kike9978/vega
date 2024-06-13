
import CowGrid from './components/CowGrid'
import CowService from './cow/cow.service'
import { useState } from 'react'
import Dialog from './components/Dialog'
import CowForm from './components/forms/CowForm'

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


  return (
    <>
      <button onClick={onOpenModalClick}>Crear vaca</button>
      <CowGrid cows={cows} />
      <Dialog >
        <CowForm onSubmit={handleCreateCow} />
      </Dialog>
    </>
  )
}

export default App
