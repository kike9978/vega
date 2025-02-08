import PropTypes from 'prop-types'

export default function PageHeader({ title, actions }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {actions && (
        <div className="flex flex-wrap gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.node
} 