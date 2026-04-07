import "./MapView.css";

const MapView = ({ selectedVet, userLocation }) => {
  const getMapUrl = () => {
    if (selectedVet) {
      return `https://maps.google.com/maps?q=${selectedVet.coordinates.lat},${selectedVet.coordinates.lng}&z=15&output=embed`;
    }
    
    // Default to NYC if no vet is selected
    return `https://maps.google.com/maps?q=40.7128,-74.0060&z=12&output=embed`;
  };

  const getDirectionsUrl = () => {
    if (selectedVet) {
      return `https://www.google.com/maps/dir/?api=1&destination=${selectedVet.coordinates.lat},${selectedVet.coordinates.lng}`;
    }
    return "#";
  };

  return (
    <div className="map-view">
      <div className="map-header">
        <h3>🗺️ Map View</h3>
        {selectedVet && (
          <div className="selected-vet-info">
            <span className="selected-vet-name">{selectedVet.name}</span>
            <a 
              href={getDirectionsUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-link"
            >
              Get Directions →
            </a>
          </div>
        )}
      </div>
      
      <div className="map-container">
        <iframe
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Veterinary Clinic Map"
          className="map-iframe"
        />
        
        {!selectedVet && (
          <div className="map-overlay">
            <div className="overlay-content">
              <span className="overlay-icon">📍</span>
              <p>Select a clinic to view its location</p>
            </div>
          </div>
        )}
      </div>
      
      {userLocation && (
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-icon">📍</span>
            <span>Your Location</span>
          </div>
          {selectedVet && (
            <div className="legend-item">
              <span className="legend-icon">🏥</span>
              <span>{selectedVet.name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapView;
