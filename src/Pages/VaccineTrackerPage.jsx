import { useState, useEffect } from "react";
import NavBarComp from "../Components/NavBarComp";
import AddVaccineForm from "../Components/Vaccine/AddVaccineForm";
import VaccineList from "../Components/Vaccine/VaccineList";
import SimbaAssistant from "../Components/SimbaAssistant";
import BackButton from "../Components/BackButton/BackButton";
import { checkVaccineReminders, calculateVaccineDueDate, addVaccineNotification } from "../Utils/NotificationUtils";
import "../Components/Vaccine/Vaccine.css";
import "./VaccineTrackerPage.css";

const VaccineTrackerPage = () => {
  // Load vaccines from localStorage on component mount
  const [vaccines, setVaccines] = useState(() => {
    const savedVaccines = localStorage.getItem('petVaccines');
    return savedVaccines ? JSON.parse(savedVaccines) : [
      {
        id: 1,
        name: "Rabies Vaccine 💉",
        dateTaken: "2024-01-15",
        nextDueDate: "2025-01-15",
        petName: "Max 🐕"
      },
      {
        id: 2,
        name: "DHPP Vaccine 💊",
        dateTaken: "2024-03-10",
        nextDueDate: "2024-09-10",
        petName: "Luna 🐈"
      }
    ];
  });

  const [showSimba, setShowSimba] = useState(true);

  const getVaccineStatus = (nextDueDate) => {
    const today = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "overdue", text: "Overdue", color: "#f44336" };
    } else if (diffDays <= 7) {
      return { status: "upcoming", text: "Upcoming", color: "#ff9800" };
    } else {
      return { status: "safe", text: "Safe", color: "#4caf50" };
    }
  };

  const handleAddVaccine = (newVaccine) => {
    // Generate unique ID based on timestamp
    const vaccine = {
      id: Date.now(), // Use timestamp for unique ID
      ...newVaccine
    };
    
    // Add to state and localStorage
    setVaccines([...vaccines, vaccine]);
    localStorage.setItem('petVaccines', JSON.stringify([...vaccines, vaccine]));
    
    // Trigger notification for new vaccine
    addVaccineNotification(vaccine);
  };

  const handleDeleteVaccine = (vaccineId) => {
    setVaccines(vaccines.filter(vaccine => vaccine.id !== vaccineId));
  };

  useEffect(() => {
    // Save vaccines to localStorage whenever they change
    localStorage.setItem('petVaccines', JSON.stringify(vaccines));
  }, [vaccines]);

  useEffect(() => {
    // Check vaccine reminders when vaccines change
    checkVaccineReminders(vaccines);
  }, [vaccines]);

  const vaccinesWithStatus = vaccines.map(vaccine => ({
    ...vaccine,
    status: getVaccineStatus(vaccine.nextDueDate)
  }));

  return (
    <div className="vaccine-tracker">
      <NavBarComp />
      <main className="vaccine-shell">
        <div className="vaccine-section">
          {/* Back Button */}
          <div className="vaccine-header">
            <BackButton label="Back" />
          </div>
          
          <div className="page-header">
            <h1> Pet Vaccine Tracker </h1>
            <p>Keep your furry friends healthy and never miss an important vaccination! </p>
          </div>
          
          <AddVaccineForm onAddVaccine={handleAddVaccine} />
          <VaccineList 
            vaccines={vaccinesWithStatus} 
            onDeleteVaccine={handleDeleteVaccine} 
          />
        </div>
      </main>
      
      {showSimba && (
        <SimbaAssistant 
          pageName="vaccine-tracker" 
          onDismiss={() => setShowSimba(false)} 
        />
      )}
    </div>
  );
};

export default VaccineTrackerPage;
