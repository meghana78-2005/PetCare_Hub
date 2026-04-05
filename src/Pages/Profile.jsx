import { useState } from "react";
import NavBarComp from "../Components/NavBarComp";
import UserCard from "../Components/UserCard";
import PetCard from "../Components/PetCard";
import VaccinationCard from "../Components/VaccinationCard";
import ActivityCard from "../Components/ActivityCard";
import "./Profile.css";

const Profile = () => {
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(pets.length === 0);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    image: "",
  });

  const user = {
    name: "Asha Patel",
    email: "asha.patel@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507143550189-fed454f93097?auto=format&fit=crop&w=400&q=80",
  };

  const vaccination = {
    lastDate: "2024-03-11",
    upcoming: "2024-09-03",
    due: true,
  };

  const activity = {
    posts: 12,
    recent: [
      "Updated Mochi\'s vaccination record.",
      "Shared a new pet care tip in the community.",
      "Scheduled Luna\'s next vet visit.",
    ],
  };

  const handlePetSelect = (pet) => {
    console.log(`Selected pet: ${pet.name}`);
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleAddPet = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSavePet = () => {
    if (formData.name && formData.breed && formData.age && formData.image) {
      const newPet = {
        id: pets.length + 1,
        ...formData,
      };
      setPets([...pets, newPet]);
      setFormData({ name: "", breed: "", age: "", image: "" });
      setShowForm(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="profile-page">
      <NavBarComp />
      <main className="profile-shell">
        <div className="profile-section">
          <UserCard
            avatar={user.avatar}
            name={user.name}
            email={user.email}
            onEdit={handleEditProfile}
          />

          {showForm ? (
            <section className="profile-card add-pet-form">
              <h3>Add Your First Pet</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Pet Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="breed">Breed</label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <button type="button" className="primary-button" onClick={handleSavePet}>
                  Save Pet
                </button>
              </form>
            </section>
          ) : (
            <>
              <section className="profile-card">
                <div className="pets-header">
                  <div>
                    <h3>My Pets</h3>
                    <p>Keep track of your furry family members.</p>
                  </div>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleAddPet}
                  >
                    + Add Pet
                  </button>
                </div>
                <div className="pets-grid">
                  {pets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onSelect={handlePetSelect} />
                  ))}
                  <button
                    type="button"
                    className="add-pet-card"
                    onClick={handleAddPet}
                  >
                    + Add Pet
                  </button>
                </div>
              </section>

              <div className="profile-footer">
                <VaccinationCard summary={vaccination} />
                <ActivityCard stats={activity} />
                <section className="profile-card settings-card">
                  <h3>Settings</h3>
                  <button type="button" className="primary-button" onClick={handleEditProfile}>
                    Edit Profile
                  </button>
                  <button type="button" className="secondary-button" onClick={handleLogout}>
                    Logout
                  </button>
                </section>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
