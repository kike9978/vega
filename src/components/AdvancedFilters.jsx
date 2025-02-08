import PropTypes from 'prop-types';
import { FILTER_SEX } from '../hooks/useCowFilter';

// Add these constants at the top of the file
const AVAILABLE_MARKS = ['il', 'r3', 'h2', 'p7'];
const AVAILABLE_UPPS = ['tacahuite', 'san jose', 'el trebol', 'la esperanza'];

export default function AdvancedFilters({ filters, onFilterChange }) {
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

  return (
    <div className="space-y-8">
      {/* Sexo Section */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Sexo</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 group cursor-pointer">
            <input
              type="radio"
              checked={filters.sex === FILTER_SEX.ALL}
              onChange={() => handleValueChange('sex', FILTER_SEX.ALL)}
              className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 group-hover:text-gray-900">Todos</span>
          </label>
          <label className="flex items-center space-x-3 group cursor-pointer">
            <input
              type="radio"
              checked={filters.sex === FILTER_SEX.FEMALE}
              onChange={() => handleValueChange('sex', FILTER_SEX.FEMALE)}
              className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 group-hover:text-gray-900">Vacas</span>
          </label>
          <label className="flex items-center space-x-3 group cursor-pointer">
            <input
              type="radio"
              checked={filters.sex === FILTER_SEX.MALE}
              onChange={() => handleValueChange('sex', FILTER_SEX.MALE)}
              className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 group-hover:text-gray-900">Toros</span>
          </label>
        </div>
      </div>

      {/* Registro Section */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Registro</h4>
        <label className="flex items-center space-x-3 group cursor-pointer">
          <input
            type="checkbox"
            checked={filters.isRegistered}
            onChange={() => handleCheckboxChange('isRegistered')}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700 group-hover:text-gray-900">Registrado</span>
        </label>
      </div>

      {/* Arete Section */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Arete</h4>
        <label className="flex items-center space-x-3 group cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={filters.hasEaring}
            onChange={() => handleCheckboxChange('hasEaring')}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700 group-hover:text-gray-900">Tiene arete</span>
        </label>
        {filters.hasEaring && (
          <input
            type="number"
            placeholder="ID del arete"
            value={filters.earingId || ''}
            onChange={(e) => handleValueChange('earingId', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>

      {/* Raza Section */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Raza</h4>
        <input
          type="text"
          placeholder="Filtrar por raza"
          value={filters.breed || ''}
          onChange={(e) => handleValueChange('breed', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Fecha de nacimiento Section */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Fecha de nacimiento</h4>
        <div className="space-y-3">
          <input
            type="date"
            value={filters.birthDateFrom || ''}
            onChange={(e) => handleValueChange('birthDateFrom', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="text-center text-sm text-gray-500">hasta</div>
          <input
            type="date"
            value={filters.birthDateTo || ''}
            onChange={(e) => handleValueChange('birthDateTo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Fierro Section */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">Fierro</h4>
        <select
          value={filters.mark || ''}
          onChange={(e) => handleValueChange('mark', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">Todos los fierros</option>
          {AVAILABLE_MARKS.map(mark => (
            <option key={mark} value={mark}>
              {mark.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* UPP Section - converted to select */}
      <div className="pb-6 border-b border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">UPP</h4>
        <select
          value={filters.upp || ''}
          onChange={(e) => handleValueChange('upp', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">Todas las UPP</option>
          {AVAILABLE_UPPS.map(upp => (
            <option key={upp} value={upp}>
              {upp.charAt(0).toUpperCase() + upp.slice(1)}
            </option>
          ))}
        </select>
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