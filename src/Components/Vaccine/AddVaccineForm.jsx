import { useState } from "react";
import { calculateVaccineDueDate } from "../../Utils/NotificationUtils";

const AddVaccineForm = ({ onAddVaccine }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateTaken: "",
    nextDueDate: "",
    petName: "",
    frequency: "1 year",
    customDuration: "",
    useCustomDuration: false
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCustomDurationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      customDuration: { ...formData.customDuration, [name]: value }
    });
  };

  const calculateCustomDueDate = (dateTaken, customDuration) => {
    const date = new Date(dateTaken);
    const { number, unit } = customDuration;
    
    switch (unit) {
      case 'days':
        date.setDate(date.getDate() + parseInt(number));
        break;
      case 'weeks':
        date.setDate(date.getDate() + (parseInt(number) * 7));
        break;
      case 'months':
        date.setMonth(date.getMonth() + parseInt(number));
        break;
      case 'years':
        date.setFullYear(date.getFullYear() + parseInt(number));
        break;
      default:
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let calculatedDueDate;
    if (formData.useCustomDuration && formData.customDuration.number && formData.customDuration.unit) {
      calculatedDueDate = calculateCustomDueDate(formData.dateTaken, formData.customDuration);
    } else {
      calculatedDueDate = calculateVaccineDueDate(formData.dateTaken, formData.frequency);
    }
    
    if (formData.name && formData.dateTaken && formData.petName) {
      onAddVaccine({
        ...formData,
        nextDueDate: calculatedDueDate
      });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setFormData({
        name: "",
        dateTaken: "",
        nextDueDate: "",
        petName: "",
        frequency: "1 year",
        customDuration: "",
        useCustomDuration: false
      });
    }
  };

  return (
    <div className="add-vaccine-form">
      <h3>Add New Vaccine</h3>
      
      {showSuccess && (
        <div className="success-message" style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          Vaccine saved successfully! 
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="vaccine-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Vaccine Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="petName">Pet Name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateTaken">Date Taken</label>
            <input
              type="date"
              id="dateTaken"
              name="dateTaken"
              value={formData.dateTaken}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="useCustomDuration"
                checked={formData.useCustomDuration}
                onChange={handleChange}
              />
              Use Custom Duration
            </label>
          </div>
        </div>
        
        {!formData.useCustomDuration ? (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="frequency">Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                required
              >
                <option value="1 year">1 Year</option>
                <option value="6 months">6 Months</option>
                <option value="3 years">3 Years</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="number">Duration</label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.customDuration.number || ''}
                onChange={handleCustomDurationChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                value={formData.customDuration.unit || ''}
                onChange={handleCustomDurationChange}
                required
              >
                <option value="">Select Unit</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nextDueDate">Next Due Date</label>
            <input
              type="date"
              id="nextDueDate"
              name="nextDueDate"
              value={formData.nextDueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="add-vaccine-btn">
          Add Vaccine
        </button>
      </form>
    </div>
  );
};

export default AddVaccineForm;
