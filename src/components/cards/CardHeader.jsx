import PropTypes from 'prop-types'

export default function CardHeader({ title, subtitle }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {subtitle && (
        <div className="text-sm text-gray-500">
          {subtitle}
        </div>
      )}
    </div>
  )
}

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node
} 