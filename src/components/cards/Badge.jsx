import PropTypes from 'prop-types'

export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-white/90 backdrop-blur-sm text-gray-700',
    error: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-700'
  }

  return (
    <span className={`${variants[variant]} px-2 py-1 rounded-md text-xs font-medium`}>
      {children}
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'error', 'info'])
} 