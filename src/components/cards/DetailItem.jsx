import PropTypes from 'prop-types'

export default function DetailItem({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">{label}:</span>
      <span className="text-sm text-gray-600">{value}</span>
    </div>
  )
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired
} 