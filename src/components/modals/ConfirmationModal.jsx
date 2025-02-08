import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../Button';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  const handleConfirm = () => {
    onClose(); // Close first to ensure UI is responsive
    onConfirm(); // Then perform the deletion
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <div className="space-y-6">
        <p className="text-gray-600">{message}</p>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            text="Cancelar"
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
          />
          <Button 
            text="Eliminar"
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          />
        </div>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}; 