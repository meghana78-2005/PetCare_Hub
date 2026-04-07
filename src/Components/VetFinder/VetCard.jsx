import { useState } from "react";
import "./VetCard.css";

const VetCard = ({ vet, isSelected, onSelect, getDirections, callVet, userLocation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'clinic': return '🏥';
      case 'hospital': return '🏢';
      case 'emergency': return '🚑';
      default: return '🏥';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'clinic': return 'Clinic';
      case 'hospital': return 'Hospital';
      case 'emergency': return 'Emergency';
      default: return 'Clinic';
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆');
    }

    return stars.join('');
  };

  const handleCardClick = () => {
    onSelect();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`vet-card ${isSelected ? 'selected' : ''}`}
      onClick={handleCardClick}
    >
      <div className="vet-card-header">
        <div className="vet-info">
          <div className="vet-name-type">
            <h4 className="vet-name">{vet.name}</h4>
            <span className="vet-type">
              {getTypeIcon(vet.type)} {getTypeLabel(vet.type)}
            </span>
          </div>
          <div className="vet-status">
            <span className={`status-badge ${vet.openNow ? 'open' : 'closed'}`}>
              {vet.openNow ? '🟢 Open' : '🔴 Closed'}
            </span>
          </div>
        </div>
        <div className="vet-rating">
          <div className="stars">{renderStars(vet.rating)}</div>
          <span className="rating-number">{vet.rating}</span>
        </div>
      </div>

      <div className="vet-card-body">
        <div className="vet-address">
          <span className="address-icon">📍</span>
          <span>{vet.address}</span>
        </div>
        
        <div className="vet-phone">
          <span className="phone-icon">📞</span>
          <span>{vet.phone}</span>
        </div>

        {userLocation && vet.distance && (
          <div className="vet-distance">
            <span className="distance-icon">🗺️</span>
            <span>{vet.distance} km away</span>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="vet-card-actions">
          <button 
            className="action-btn details-btn"
            onClick={(e) => {
              e.stopPropagation();
              // View details functionality
            }}
          >
            📋 View Details
          </button>
          <button 
            className="action-btn directions-btn"
            onClick={(e) => {
              e.stopPropagation();
              getDirections(vet);
            }}
          >
            🗺️ Get Directions
          </button>
          <button 
            className="action-btn call-btn"
            onClick={(e) => {
              e.stopPropagation();
              callVet(vet.phone);
            }}
          >
            📞 Call Now
          </button>
        </div>
      )}
    </div>
  );
};

export default VetCard;
