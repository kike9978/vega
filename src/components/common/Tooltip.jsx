import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10, // Add some offset
        left: rect.left + (rect.width / 2)
      });
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help inline-block"
      >
        {children}
      </div>
      
      {isVisible && createPortal(
        <div 
          className="fixed z-50 transform -translate-x-1/2 -translate-y-full"
          style={{ 
            top: `${position.top}px`, 
            left: `${position.left}px` 
          }}
        >
          <div className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg whitespace-nowrap mb-2">
            {text}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}; 