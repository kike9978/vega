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
import TableView from './components/views/TableView'
import SelectButton from './components/common/SelectButton'
import ConfirmationModal from './components/modals/ConfirmationModal'
import BatchOperations from './components/BatchOperations'
import { VIEW_MODES } from './constants/viewModes'
import { exportToExcel } from './utils/exportUtils'

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
  const [viewMode, setViewMode] = useState(VIEW_MODES.CARD)
  const [cowToDelete, setCowToDelete] = useState(null)
  const [selectedCows, setSelectedCows] = useState(new Set())
  const [cowToEdit, setCowToEdit] = useState(null)

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

  const handleDelete = (cow) => {
    setCowToDelete(cow);
  };

  const handleSelect = (cowId) => {
    setSelectedCows(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(cowId)) {
        newSelected.delete(cowId);
      } else {
        newSelected.add(cowId);
      }
      return newSelected;
    });
  };

  const handleBatchDelete = () => {
    if (selectedCows.size > 0) {
      setCowToDelete({
        ids: Array.from(selectedCows),
        name: `${selectedCows.size} ${selectedCows.size === 1 ? 'elemento' : 'elementos'}`
      });
    }
  };

  const confirmDelete = () => {
    if (cowToDelete) {
      let updatedCows;
      if (Array.isArray(cowToDelete.ids)) {
        // Batch delete
        updatedCows = cows.filter(cow => !cowToDelete.ids.includes(cow.id));
        setSelectedCows(new Set());
      } else {
        // Single delete
        updatedCows = cows.filter(cow => cow.id !== cowToDelete.id);
      }
      setCows(updatedCows);
      cowService.setCows(updatedCows);
      setCowToDelete(null);
    }
  };

  const handleBatchExport = () => {
    if (selectedCows.size > 0) {
      const selectedCowsData = finalFilteredCows.filter(cow => 
        selectedCows.has(cow.id)
      );
      exportToExcel(selectedCowsData, 'ganado_seleccionado');
    }
  };

  // Add export all functionality
  const handleExportAll = () => {
    exportToExcel(finalFilteredCows, 'ganado_completo');
  };

  const viewOptions = [
    {
      value: VIEW_MODES.CARD,
      label: 'Vista de tarjetas',
      icon: '🗂️'
    },
    {
      value: VIEW_MODES.TABLE,
      label: 'Vista de tabla',
      icon: '📋'
    }
  ];

  const headerActions = (
    <>
      <BatchOperations 
        selectedCount={selectedCows.size}
        onDelete={handleBatchDelete}
        onExport={handleBatchExport}
      />
      <SelectButton 
        options={viewOptions}
        value={viewMode}
        onChange={setViewMode}
      />
      <Button 
        onClick={() => setIsModalOpen(true)} 
        text="Añadir ganado"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      />
      <Button 
        onClick={handleExportAll}
        text="Exportar todo"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
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

  const handleEdit = (cow) => {
    // Make sure we pass a copy of the cow with the correct date format
    const cowToEditData = {
      ...cow,
      birthDate: new Date(cow.birthDate) // Ensure birthDate is a Date object
    };
    setCowToEdit(cowToEditData);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedCow) => {
    const updatedCows = cows.map(cow => 
      cow.id === updatedCow.id ? updatedCow : cow
    );
    setCows(updatedCows);
    cowService.setCows(updatedCows);
    setIsModalOpen(false);
    setCowToEdit(null);
  };

  // Update the menu options in both CowCard and TableView
  const getMenuOptions = (cow) => [
    {
      label: 'Editar',
      onClick: () => handleEdit(cow),
      icon: '✏️',
      className: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
    },
    {
      label: 'Eliminar',
      onClick: () => handleDelete(cow),
      icon: '🗑️',
      className: 'text-red-600 hover:text-red-700 hover:bg-red-50'
    }
  ];

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
        {viewMode === VIEW_MODES.CARD ? (
          <CowGrid 
            cows={finalFilteredCows}
            onDelete={handleDelete}
            selectedCows={selectedCows}
            onSelect={handleSelect}
            getMenuOptions={getMenuOptions}
          />
        ) : (
          <TableView 
            cows={finalFilteredCows}
            onDelete={handleDelete}
            selectedCows={selectedCows}
            onSelect={handleSelect}
            getMenuOptions={getMenuOptions}
          />
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCowToEdit(null);
        }}
        title={cowToEdit ? "Editar ganado" : "Registrar ganado"}
      >
        <CowForm 
          onSubmit={cowToEdit ? handleUpdate : createCow}
          onClose={() => {
            setIsModalOpen(false);
            setCowToEdit(null);
          }}
          initialData={cowToEdit}
        />
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

      <ConfirmationModal
        isOpen={!!cowToDelete}
        onClose={() => setCowToDelete(null)}
        onConfirm={confirmDelete}
        title="Eliminar ganado"
        message={`¿Estás seguro que deseas eliminar a ${cowToDelete?.name}?`}
      />
    </PageContainer>
  )
}

export default App
