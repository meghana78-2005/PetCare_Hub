import VaccineCard from "./VaccineCard";

const VaccineList = ({ vaccines, onDeleteVaccine }) => {
  return (
    <div className="vaccine-list">
      <h3>Vaccination Records</h3>
      {vaccines.length === 0 ? (
        <div className="no-vaccines">
          <p>No vaccines added yet. Add your first vaccine above!</p>
        </div>
      ) : (
        <div className="vaccines-grid">
          {vaccines.map((vaccine) => (
            <VaccineCard
              key={vaccine.id}
              vaccine={vaccine}
              onDeleteVaccine={onDeleteVaccine}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VaccineList;
