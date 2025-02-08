import PropTypes from 'prop-types'
import Card from '../layout/Card'
import Button from '../Button'

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
        
        {/* Modal Content */}
        <Card className="relative w-full max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <Button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Cerrar"
              text="×"
            />
          </div>

          {/* Body */}
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {children}
          </div>
        </Card>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
} 