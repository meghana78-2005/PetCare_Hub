const VaccineCard = ({ vaccine, onDeleteVaccine }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDue = (nextDueDate) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays <= 7) {
      return `${diffDays} days`;
    } else {
      return `${diffDays} days`;
    }
  };

  return (
    <div className="vaccine-card">
      <div className="vaccine-header">
        <h4>{vaccine.name}</h4>
        <span 
          className="vaccine-status" 
          style={{ backgroundColor: vaccine.status.color }}
        >
          {vaccine.status.text}
        </span>
      </div>
      
      <div className="vaccine-details">
        <div className="vaccine-info">
          <span className="info-label">Pet:</span>
          <span className="info-value">{vaccine.petName}</span>
        </div>
        
        <div className="vaccine-info">
          <span className="info-label">Date Taken:</span>
          <span className="info-value">{formatDate(vaccine.dateTaken)}</span>
        </div>
        
        <div className="vaccine-info">
          <span className="info-label">Next Due:</span>
          <span className="info-value">{formatDate(vaccine.nextDueDate)}</span>
        </div>
        
        <div className="vaccine-info">
          <span className="info-label">Time Until Due:</span>
          <span className="info-value">{getDaysUntilDue(vaccine.nextDueDate)}</span>
        </div>
      </div>
      
      <button 
        className="delete-vaccine-btn"
        onClick={() => onDeleteVaccine(vaccine.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default VaccineCard;
