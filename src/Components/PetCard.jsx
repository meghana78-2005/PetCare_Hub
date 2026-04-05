const PetCard = ({ pet, onSelect }) => {
  return (
    <button type="button" className="pet-card" onClick={() => onSelect(pet)}>
      <div className="pet-image-wrap">
        <img className="pet-image" src={pet.image} alt={pet.name} />
      </div>
      <div className="pet-card-content">
        <h3>{pet.name}</h3>
        <p>{pet.breed}</p>
        <span>{pet.age}</span>
      </div>
    </button>
  );
};

export default PetCard;
