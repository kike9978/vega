import PropTypes from 'prop-types';

export default function SelectButton({ options, value, onChange, className = '' }) {
  return (
    <div className={`inline-flex rounded-md shadow-sm ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium
            ${option.value === value 
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-150' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }
            border border-gray-200
            ${option === options[0] ? 'rounded-l-md' : ''}
            ${option === options[options.length - 1] ? 'rounded-r-md' : ''}
            ${option !== options[0] ? '-ml-px' : ''}
            focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500
          `}
          aria-label={option.label}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

SelectButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}; 