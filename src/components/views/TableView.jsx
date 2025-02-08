import PropTypes from 'prop-types';
import { SEX_TEXT, UPP_TEXT, MARK_TEXT } from '../../data/types';
import Button from '../Button';
import MoreOptionsMenu from '../common/MoreOptionsMenu';

export default function TableView({ cows, onDelete, selectedCows, onSelect }) {
  return (
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sexo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              UPP
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fierro
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registro
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Arete
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Nacimiento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cruza
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cows.map((cow) => {
            const menuOptions = [
              {
                label: 'Eliminar',
                onClick: () => onDelete(cow),
                icon: '🗑️',
                className: 'text-red-600 hover:text-red-700 hover:bg-red-50'
              }
              // Add more options here as needed
            ];

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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <MoreOptionsMenu options={menuOptions} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedCows: PropTypes.instanceOf(Set).isRequired,
  onSelect: PropTypes.func.isRequired,
}; 