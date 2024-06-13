
import CowGrid from './components/CowGrid'
import CowService from './cow/cow.service'
import { useState } from 'react'
import Dialog from './components/Dialog'
import CowForm from './components/forms/CowForm'

const cowService = new CowService()
function App() {
  const [cows, setCows] = useState(cowService.getCows())


  function createCow() {
    cowService.createCow({ name: "Lola", id: 1234, birthDate: "10 de mayo", opp: "tacahuite", mark: "IL", isRegistered: true })
    setCows(cowService.getCows())
  }

  function openCreateCowModal() {
    setModalOpen(true)
  }

  function onOpenModalClick() {
    document.querySelector("dialog").showModal()
  }
  function handleCreateCow() {
    createCow()
  }


  return (
    <>
      <button onClick={onOpenModalClick}>crea vaca</button>
      <CowGrid cows={cows} />
      <Dialog >
        <CowForm onSubmit={handleCreateCow} />
      </Dialog>
    </>
  )
}

export default App
