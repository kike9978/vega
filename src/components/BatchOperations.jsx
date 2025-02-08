import PropTypes from 'prop-types';
import Button from './Button';

export default function BatchOperations({ selectedCount, onDelete, onExport }) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        {selectedCount} {selectedCount === 1 ? 'elemento seleccionado' : 'elementos seleccionados'}
      </span>
      <div className="flex gap-2">
        <Button
          onClick={onExport}
          text="Exportar seleccionados"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        />
        <Button
          onClick={onDelete}
          text="Eliminar seleccionados"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        />
      </div>
    </div>
  );
}

BatchOperations.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
}; 