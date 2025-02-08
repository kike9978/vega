import PropTypes from 'prop-types';
import Button from '../Button';

export const VIEW_MODES = {
  CARD: 'card',
  TABLE: 'table'
};

export default function ViewToggle({ currentView, onViewChange }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onViewChange(VIEW_MODES.CARD)}
        className={`p-2 rounded-md ${
          currentView === VIEW_MODES.CARD
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Vista de tarjetas"
        text="🗂️"
      />
      <Button
        onClick={() => onViewChange(VIEW_MODES.TABLE)}
        className={`p-2 rounded-md ${
          currentView === VIEW_MODES.TABLE
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-label="Vista de tabla"
        text="📋"
      />
    </div>
  );
}

ViewToggle.propTypes = {
  currentView: PropTypes.oneOf(Object.values(VIEW_MODES)).isRequired,
  onViewChange: PropTypes.func.isRequired
}; 