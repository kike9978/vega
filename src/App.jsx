import { useEffect, useState } from 'react'
import CowGrid from './components/CowGrid'
import CowService from './cow/cow.service'
import CowForm from './components/forms/CowForm'
import Button from './components/Button'
import CowFilters from './components/CowFilters'
import SidePanel from './components/SidePanel'
import AdvancedFilters from './components/AdvancedFilters'
import { useCowFilter } from './hooks/useCowFilter'
import { mockCows } from './data/mockCows'
import { FILTER_SEX } from './hooks/useCowFilter'
import PageContainer from './components/layout/PageContainer'
import Card from './components/layout/Card'
import PageHeader from './components/layout/PageHeader'
import Modal from './components/modals/Modal'

const cowService = new CowService()

function App() {
  const [cows, setCows] = useState([])
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState({
    sex: FILTER_SEX.ALL,
    isRegistered: false,
    hasEaring: false,
    earingId: '',
    breed: '',
    birthDateFrom: '',
    birthDateTo: '',
    upp: '',
  })

  const {
    filterText,
    setFilterText,
    filteredCows
  } = useCowFilter(cows)

  // Apply advanced filters
  const finalFilteredCows = filteredCows.filter(cow => {
    if (advancedFilters.sex && cow.sex !== advancedFilters.sex) return false
    if (advancedFilters.isRegistered && !cow.isRegistered) return false
    if (advancedFilters.hasEaring && !cow.hasEaring) return false
    if (advancedFilters.earingId && cow.earingId?.toString() !== advancedFilters.earingId) return false
    if (advancedFilters.breed && !cow.breed.toLowerCase().includes(advancedFilters.breed.toLowerCase())) return false
    if (advancedFilters.upp && !cow.upp.toLowerCase().includes(advancedFilters.upp.toLowerCase())) return false
    
    if (advancedFilters.birthDateFrom || advancedFilters.birthDateTo) {
      const cowDate = new Date(cow.birthDate)
      if (advancedFilters.birthDateFrom && cowDate < new Date(advancedFilters.birthDateFrom)) return false
      if (advancedFilters.birthDateTo && cowDate > new Date(advancedFilters.birthDateTo)) return false
    }
    
    return true
  })

  useEffect(() => {
    const initialCows = cowService.getCows() || []
    setCows(initialCows)
  }, [])

  const createCow = (cowData) => {
    // Check for duplicate earring ID if the cow has one
    if (cowData.isRegistered && cowData.hasEaring && cowData.earingId) {
      const isDuplicateEaring = cows.some(
        existingCow => 
          existingCow.isRegistered && 
          existingCow.hasEaring && 
          existingCow.earingId?.toString() === cowData.earingId?.toString()
      );

      if (isDuplicateEaring) {
        alert('Ya existe un animal registrado con este número de arete');
        return;
      }
    }

    const newCow = {
      ...cowData,
      id: crypto.randomUUID()
    };
    cowService.createCow(newCow);
    setCows(cowService.getCows());
    setIsModalOpen(false);
  };

  const handlePopulateMock = () => {
    mockCows.forEach(cow => createCow(cow))
  }

  const headerActions = (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)} 
        text="Añadir ganado"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      />
      <Button 
        onClick={handlePopulateMock} 
        text="Llenar con info de prueba"
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      />
      <Button 
        onClick={() => setIsSidePanelOpen(true)} 
        text="Filtros avanzados"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
      />
    </>
  )

  return (
    <PageContainer>
      <Card>
        <PageHeader 
          title="Gestión de Ganado"
          actions={headerActions}
        />
      </Card>

      <Card>
        <CowFilters
          onFilterTextChange={setFilterText}
          filterText={filterText}
        />
      </Card>

      <Card>
        <CowGrid cows={finalFilteredCows} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar ganado"
      >
        <CowForm onSubmit={createCow} />
      </Modal>

      <SidePanel 
        isOpen={isSidePanelOpen} 
        onClose={() => setIsSidePanelOpen(false)}
      >
        <AdvancedFilters 
          filters={advancedFilters}
          onFilterChange={setAdvancedFilters}
        />
      </SidePanel>
    </PageContainer>
  )
}

export default App
