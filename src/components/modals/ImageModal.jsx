import PropTypes from 'prop-types';
import Modal from './Modal';

export default function ImageModal({ isOpen, onClose, imageUrl, cowName }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Foto de ${cowName}`}
      size="lg"
    >
      <div className="flex items-center justify-center">
        <img
          src={imageUrl}
          alt={`Foto de ${cowName}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
      </div>
    </Modal>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  cowName: PropTypes.string.isRequired,
}; 