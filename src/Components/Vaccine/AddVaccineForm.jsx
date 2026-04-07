import { useState } from "react";

const AddVaccineForm = ({ onAddVaccine }) => {
  const [formData, setFormData] = useState({
    name: "",
    dateTaken: "",
    nextDueDate: "",
    petName: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.dateTaken && formData.nextDueDate && formData.petName) {
      onAddVaccine(formData);
      setFormData({
        name: "",
        dateTaken: "",
        nextDueDate: "",
        petName: ""
      });
    }
  };

  return (
    <div className="add-vaccine-form">
      <h3>Add New Vaccine</h3>
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
