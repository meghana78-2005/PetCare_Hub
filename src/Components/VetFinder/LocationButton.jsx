import { useState } from "react";
import "./LocationButton.css";

const LocationButton = ({ onLocationRequest, userLocation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onLocationRequest();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="location-button">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`location-btn ${userLocation ? 'location-active' : ''}`}
      >
        {isLoading ? (
          <span className="loading-text">
            📍 Getting location...
          </span>
        ) : userLocation ? (
          <span className="location-text">
            📍 Location Found
          </span>
        ) : (
          <span className="location-text">
            📍 Use My Location
          </span>
        )}
      </button>
      {userLocation && (
        <div className="location-info">
          <small>🗺️ Showing nearest vets</small>
        </div>
      )}
    </div>
  );
};

export default LocationButton;
