import PropTypes from 'prop-types';
import { FILTER_SEX } from '../hooks/useCowFilter';

export default function SidePanel({ isOpen, onClose, children }) {
  // Function to check if filters are active from the children props
  const hasActiveFilters = () => {
    const filters = children?.props?.filters;
    if (!filters) return false;

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

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
              {hasActiveFilters() && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Filtros activos
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

SidePanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}; 