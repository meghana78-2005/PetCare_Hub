const VaccinationCard = ({ summary }) => {
  return (
    <section className="profile-card summary-card">
      <div className="summary-labels">
        <h3>Vaccination Summary</h3>
        {summary.due && <span className="warning-text">⚠️ Vaccination due soon</span>}
      </div>
      <div className="summary-row">
        <div>
          <p className="summary-title">Last Vaccination</p>
          <p className="summary-value">{summary.lastDate}</p>
        </div>
        <div>
          <p className="summary-title">Upcoming</p>
          <p className="summary-value">{summary.upcoming}</p>
        </div>
      </div>
    </section>
  );
};

export default VaccinationCard;
