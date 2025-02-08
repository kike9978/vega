import PropTypes from 'prop-types';
import { FILTER_SEX } from '../hooks/useCowFilter';
import Input from "./forms/Input"
import Select from "./Select"
import { UPP_TEXT, MARK_TEXT } from "../data/types"
import Button from './Button';

// Add these constants at the top of the file
const AVAILABLE_MARKS = ['il', 'r3', 'h2', 'p7'];
const AVAILABLE_UPPS = ['tacahuite', 'san jose', 'el trebol', 'la esperanza'];

export default function AdvancedFilters({ filters, onFilterChange }) {
  // Convert UPP_TEXT and MARK_TEXT objects to options array
  const uppOptions = Object.entries(UPP_TEXT).map(([value, text]) => ({
    value,
    text
  }));

  const markOptions = Object.entries(MARK_TEXT).map(([value, text]) => ({
    value,
    text
  }));

  const handleCheckboxChange = (field) => {
    onFilterChange({
      ...filters,
      [field]: !filters[field]
    });
  };

  const handleValueChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const hasActiveFilters = () => {
    return filters.sex !== FILTER_SEX.ALL ||
      filters.isRegistered ||
      filters.hasEaring ||
      filters.earingId ||
      filters.breed ||
      filters.upp ||
      filters.mark ||
      filters.birthDateFrom ||
      filters.birthDateTo;
  };

  const handleClearFilters = () => {
    onFilterChange({
      sex: FILTER_SEX.ALL,
      isRegistered: false,
      hasEaring: false,
      earingId: '',
      breed: '',
      birthDateFrom: '',
      birthDateTo: '',
      upp: '',
      mark: ''
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Filtros avanzados
          {hasActiveFilters() && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Filtros activos
            </span>
          )}
        </h2>
        {hasActiveFilters() && (
          <Button
            onClick={handleClearFilters}
            text="Limpiar filtros"
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-md"
          />
        )}
      </div>
      <div className="space-y-4">
        <Select
          label="Sexo"
          name="sex"
          defaultOption={{ value: FILTER_SEX.ALL, text: "Todos" }}
          options={[
            { value: FILTER_SEX.MALE, text: "Macho" },
            { value: FILTER_SEX.FEMALE, text: "Hembra" },
          ]}
          value={filters.sex}
          onChange={(value) => handleValueChange('sex', value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="UPP"
            name="upp"
            defaultOption={{ value: "", text: "Todos" }}
            options={uppOptions}
            value={filters.upp}
            onChange={(value) => handleValueChange('upp', value)}
          />

          <Select
            label="Fierro"
            name="mark"
            defaultOption={{ value: "", text: "Todos" }}
            options={markOptions}
            value={filters.mark}
            onChange={(value) => handleValueChange('mark', value)}
          />
        </div>

        <Input
          label="Cruza"
          name="breed"
          value={filters.breed}
          onChange={(e) => handleValueChange('breed', e.target.value)}
        />

        <Input
          label="Número de arete"
          name="earingId"
          value={filters.earingId}
          onChange={(e) => handleValueChange('earingId', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Fecha de nacimiento desde"
            name="birthDateFrom"
            type="date"
            value={filters.birthDateFrom}
            onChange={(e) => handleValueChange('birthDateFrom', e.target.value)}
          />

          <Input
            label="Fecha de nacimiento hasta"
            name="birthDateTo"
            type="date"
            value={filters.birthDateTo}
            onChange={(e) => handleValueChange('birthDateTo', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Input
            type="checkbox"
            label="Solo registrados"
            name="isRegistered"
            checked={filters.isRegistered}
            onChange={(e) => handleCheckboxChange('isRegistered')}
          />

          <Input
            type="checkbox"
            label="Solo con arete"
            name="hasEaring"
            checked={filters.hasEaring}
            onChange={(e) => handleCheckboxChange('hasEaring')}
          />
        </div>
      </div>
    </div>
  );
}

AdvancedFilters.propTypes = {
  filters: PropTypes.shape({
    sex: PropTypes.string,
    isRegistered: PropTypes.bool,
    hasEaring: PropTypes.bool,
    earingId: PropTypes.string,
    breed: PropTypes.string,
    birthDateFrom: PropTypes.string,
    birthDateTo: PropTypes.string,
    upp: PropTypes.string,
    mark: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
}; 