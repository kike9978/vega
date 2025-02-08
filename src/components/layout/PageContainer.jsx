import PropTypes from 'prop-types'

export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {children}
      </div>
    </div>
  )
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired
} 