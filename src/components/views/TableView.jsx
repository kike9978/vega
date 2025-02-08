import PropTypes from 'prop-types';
import { SEX_TEXT, UPP_TEXT, MARK_TEXT } from '../../data/types';
import Button from '../Button';
import MoreOptionsMenu from '../common/MoreOptionsMenu';
import { useState } from 'react';
import ImageModal from '../modals/ImageModal';

export default function TableView({ cows, onDelete, selectedCows, onSelect, getMenuOptions }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedCows = () => {
    if (!sortConfig.key) return cows;

    return [...cows].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Special handling for dates
      if (sortConfig.key === 'birthDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Special handling for text mappings
      if (sortConfig.key === 'sex') {
        aValue = SEX_TEXT[aValue];
        bValue = SEX_TEXT[bValue];
      } else if (sortConfig.key === 'upp') {
        aValue = UPP_TEXT[aValue];
        bValue = UPP_TEXT[bValue];
      } else if (sortConfig.key === 'mark') {
        aValue = MARK_TEXT[aValue];
        bValue = MARK_TEXT[bValue];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const sortedCows = getSortedCows();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={cows.length > 0 && cows.every(cow => selectedCows.has(cow.id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onSelect(new Set(cows.map(cow => cow.id)));
                    } else {
                      onSelect(new Set());
                    }
                  }}
                />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Nombre {getSortIcon('name')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sex')}
              >
                Sexo {getSortIcon('sex')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('upp')}
              >
                UPP {getSortIcon('upp')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('mark')}
              >
                Fierro {getSortIcon('mark')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('isRegistered')}
              >
                Registro {getSortIcon('isRegistered')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('earingId')}
              >
                Arete {getSortIcon('earingId')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('birthDate')}
              >
                Fecha de Nacimiento {getSortIcon('birthDate')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('breed')}
              >
                Cruza {getSortIcon('breed')}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCows.map((cow) => {
              return (
                <tr key={cow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCows.has(cow.id)}
                      onChange={() => onSelect(cow.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cow.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {SEX_TEXT[cow.sex]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {UPP_TEXT[cow.upp]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {MARK_TEXT[cow.mark]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cow.isRegistered ? "Registrado" : "Sin registrar"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cow.hasEaring ? cow.earingId : "Sin arete"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cow.birthDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cow.breed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cow.imageUrl && (
                      <img
                        src={cow.imageUrl}
                        alt={`Foto de ${cow.name}`}
                        className="w-12 h-12 rounded object-cover cursor-pointer"
                        onClick={() => setSelectedImage(cow)}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <MoreOptionsMenu options={getMenuOptions(cow)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.imageUrl}
          cowName={selectedImage.name}
        />
      )}
    </>
  );
}

TableView.propTypes = {
  cows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      upp: PropTypes.string.isRequired,
      mark: PropTypes.string.isRequired,
      isRegistered: PropTypes.bool.isRequired,
      hasEaring: PropTypes.bool.isRequired,
      earingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      birthDate: PropTypes.instanceOf(Date).isRequired,
      breed: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedCows: PropTypes.instanceOf(Set).isRequired,
  onSelect: PropTypes.func.isRequired,
  getMenuOptions: PropTypes.func.isRequired,
}; 