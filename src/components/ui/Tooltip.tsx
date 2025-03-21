import React, { ReactNode, useRef, useEffect, useState } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  width?: string;
  position?: TooltipPosition;
  offset?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content,
  width = 'w-64',
  position = 'auto',
  offset = 8,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [actualPosition, setActualPosition] = useState<Exclude<TooltipPosition, 'auto'>>('bottom');

  useEffect(() => {
    // Initial positioning - default to bottom if not auto
    if (position !== 'auto') {
      setActualPosition(position as Exclude<TooltipPosition, 'auto'>);
      return;
    }

    const updatePosition = () => {
      if (!containerRef.current || !tooltipRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current.offsetHeight;
      
      // Get viewport height
      const viewportHeight = window.innerHeight;
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - containerRect.bottom;
      
      // Set position based on available space
      if (spaceBelow < (tooltipHeight + offset)) {
        setActualPosition('top');
      } else {
        setActualPosition('bottom');
      }
    };

    // Set an initial timeout to ensure the tooltip has rendered
    const initialTimer = setTimeout(() => {
      updatePosition();
    }, 0);

    // Listen for resize events
    window.addEventListener('resize', updatePosition);
    
    // Cleanup
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', updatePosition);
    };
  }, [position, offset, content]);
  
  // Position classes
  const positionClasses = {
    top: `bottom-full left-1/2 transform -translate-x-1/2 mb-${offset/2}`,
    bottom: `top-full left-1/2 transform -translate-x-1/2 mt-${offset/2}`,
    left: `right-full top-1/2 transform -translate-y-1/2 mr-${offset/2}`,
    right: `left-full top-1/2 transform -translate-y-1/2 ml-${offset/2}`
  };

  return (
    <div className={`relative group ${className}`} ref={containerRef}>
      {children}
      
      <div 
        ref={tooltipRef}
        className={`absolute opacity-0 group-hover:opacity-100 bg-white text-sm text-gray-800 
          shadow-md rounded-lg p-4 ${width} transition-opacity duration-200 
          z-50 pointer-events-none ${positionClasses[actualPosition]}`}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;