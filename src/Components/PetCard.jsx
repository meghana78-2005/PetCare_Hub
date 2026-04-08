import "./PetCard.css";

const PetCard = ({ pet, onSelect }) => {
  return (
    <button type="button" className="pet-card" onClick={() => onSelect(pet)}>
      <div className="pet-image-wrap">
        <img className="pet-image" src={pet.image || 'https://via.placeholder.com/150'} alt={pet.name} />
      </div>
      <div className="pet-card-content">
        <h3>{pet.name}</h3>
        <p>{pet.breed || 'Mixed Breed'}</p>
        <span>{pet.age || 'Age unknown'}</span>
      </div>
    </button>
  );
};

export default PetCard;
