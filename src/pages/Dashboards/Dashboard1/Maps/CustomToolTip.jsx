import React, { useState } from "react";

const CustomTooltip = ({ marker }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="custom-tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVisible && (
        <div className="tooltip-content">
          <h3>Device Information</h3>
          <p>{marker.label}</p>
          <p>{marker.status}</p>
          <p>{marker.wilaya}</p>
          <p>{marker.type}</p>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
