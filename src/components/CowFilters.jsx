import PropTypes from 'prop-types';

export default function CowFilters({ onFilterTextChange, filterText }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">
          Buscar ganado
        </label>
        <input 
          id="search"
          type="text" 
          onChange={(e) => onFilterTextChange(e.target.value)} 
          value={filterText}
          placeholder="Buscar por nombre..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

CowFilters.propTypes = {
  onFilterTextChange: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
}; 