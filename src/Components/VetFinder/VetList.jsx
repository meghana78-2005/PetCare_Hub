import VetCard from "./VetCard";
import "./VetList.css";

const VetList = ({ vets, onVetSelect, selectedVet, getDirections, callVet, userLocation }) => {
  if (vets.length === 0) {
    return (
      <div className="vet-list-empty">
        <div className="empty-icon">🏥</div>
        <h3>No veterinary clinics found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="vet-list">
      <div className="vet-list-header">
        <h3>Veterinary Clinics Near You</h3>
        <span className="results-count">{vets.length} results</span>
      </div>
      
      <div className="vet-cards">
        {vets.map((vet) => (
          <VetCard
            key={vet.id}
            vet={vet}
            isSelected={selectedVet?.id === vet.id}
            onSelect={() => onVetSelect(vet)}
            getDirections={getDirections}
            callVet={callVet}
            userLocation={userLocation}
          />
        ))}
      </div>
    </div>
  );
};

export default VetList;
