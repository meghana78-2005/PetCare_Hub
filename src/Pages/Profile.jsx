import { useState, useEffect } from "react";
import { auth, db } from "../firebase/FireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import NavBarComp from "../Components/NavBarComp";
import UserCard from "../Components/UserCard";
import PetCard from "../Components/PetCard";
import VaccinationCard from "../Components/VaccinationCard";
import ActivityCard from "../Components/ActivityCard";
import SimbaAssistant from "../Components/SimbaAssistant";
import BackButton from "../Components/BackButton/BackButton";
import "./Profile.css";

const Profile = () => {
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showSimba, setShowSimba] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bio: "",
    profilePhoto: "",
    petExperience: "",
    favoritePet: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    image: "",
    gender: "",
    weight: "",
    color: "",
    personality: "",
    medicalConditions: "",
    diet: ""
  });

  // Fetch user-specific pets from Firestore
  const fetchUserPets = async (userId) => {
    try {
      const petsRef = collection(db, "pets");
      const q = query(petsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userPets = [];
      querySnapshot.forEach((doc) => {
        userPets.push({ id: doc.id, ...doc.data() });
      });
      setPets(userPets);
      setShowForm(userPets.length === 0);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setProfileData({
          displayName: user.displayName || "",
          email: user.email || "",
          phoneNumber: "",
          address: "",
          bio: "",
          profilePhoto: user.photoURL || "",
          petExperience: "",
          favoritePet: ""
        });
        fetchUserPets(user.uid);
      } else {
        setPets([]);
        setShowForm(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const vaccination = {
    lastDate: "2024-03-11",
    upcoming: "2024-09-03",
    due: true,
  };

  const activity = {
    posts: 12,
    recent: [
      "Updated Mochi's vaccination record.",
      "Shared a new pet care tip in the community.",
      "Scheduled Luna's next vet visit.",
    ],
  };

  const handlePetSelect = (pet) => {
    console.log(`Selected pet: ${pet.name}`);
  };

  const handleEditProfile = () => {
    setEditingProfile(true);
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (currentUser && profileData.displayName) {
      try {
        await updateFirebaseProfile(currentUser, {
          displayName: profileData.displayName
        });
        setCurrentUser({ ...currentUser, displayName: profileData.displayName });
        setEditingProfile(false);
        
        // Show success message
        setSuccessMessage("Profile updated successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
        setSuccessMessage("Error updating profile. Please try again.");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } else {
      setSuccessMessage("Please enter a display name.");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingProfile(false);
    if (currentUser) {
      setProfileData({
        displayName: currentUser.displayName || "",
        email: currentUser.email || ""
      });
    }
  };

  const getDefaultAvatar = (email) => {
    if (!email) return "https://images.unsplash.com/photo-1507143550189-fed454f93097?auto=format&fit=crop&w=400&q=80";
    const firstLetter = email.charAt(0).toUpperCase();
    const colors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336", "#00bcd4"];
    const colorIndex = email.charCodeAt(0) % colors.length;
    return `https://ui-avatars.com/api/?name=${firstLetter}&background=${colors[colorIndex].replace('#', '')}&color=fff&size=200`;
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

  const handlePetPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePet = async (petId) => {
    try {
      await deleteDoc(doc(db, "pets", petId));
      setPets(pets.filter(pet => pet.id !== petId));
    } catch (error) {
      console.error("Error removing pet:", error);
      alert("Error removing pet. Please try again.");
    }
  };

  const handleSavePet = async () => {
    if (formData.name && formData.breed && formData.age && formData.image && currentUser) {
      try {
        const petsRef = collection(db, "pets");
        const newPet = {
          ...formData,
          userId: currentUser.uid,
          createdAt: new Date().toISOString(),
        };
        const docRef = await addDoc(petsRef, newPet);
        const petWithId = { id: docRef.id, ...newPet };
        setPets([...pets, petWithId]);
        setFormData({ name: "", breed: "", age: "", image: "" });
        setShowForm(false);
        alert("Pet saved successfully!");
      } catch (error) {
        console.error("Error saving pet:", error);
        alert("Error saving pet. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <NavBarComp />
        <main className="profile-shell">
          <div className="profile-section">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-page">
        <NavBarComp />
        <main className="profile-shell">
          <div className="profile-section">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Please log in to view your profile.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <NavBarComp />
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            backgroundColor: successMessage.includes('Error') || successMessage.includes('Please') ? '#f44336' : '#4caf50',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            zIndex: '10000',
            fontSize: '16px',
            fontWeight: '500',
            maxWidth: '300px',
            wordWrap: 'break-word'
          }}
        >
          {successMessage}
        </div>
      )}
      
      <main className="profile-shell">
        <div className="profile-section">
          {/* Back Button */}
          <div className="profile-header">
            {editingProfile ? (
              <BackButton 
                label="Cancel" 
                onClick={handleCancelEdit}
                style={{ backgroundColor: '#dc3545' }}
              />
            ) : (
              <BackButton label="Back" />
            )}
          </div>

          {currentUser && !editingProfile && !currentUser.displayName ? (
            <section className="profile-card edit-profile-form">
              <div className="profile-setup-header">
                <div className="default-avatar">
                  <img src={profileData.profilePhoto || getDefaultAvatar(currentUser.email)} alt="Profile" />
                </div>
                <h3>Welcome! Let's set up your profile</h3>
                <p>Complete your profile to get started with PetCareHub 🐾</p>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="profilePhoto">Profile Photo</label>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleProfilePhotoUpload}
                    className="file-input"
                  />
                  {profileData.profilePhoto && (
                    <div className="photo-preview">
                      <img src={profileData.profilePhoto} alt="Profile preview" />
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="displayName">Display Name *</label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleProfileChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleProfileChange}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                  <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>Email cannot be changed</small>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    placeholder="123 Main St, City, State"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself and your love for pets..."
                    rows={3}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="petExperience">Pet Experience</label>
                    <select
                      id="petExperience"
                      name="petExperience"
                      value={profileData.petExperience}
                      onChange={handleProfileChange}
                    >
                      <option value="">Select experience</option>
                      <option value="beginner">Beginner (New pet parent)</option>
                      <option value="intermediate">Intermediate (Some experience)</option>
                      <option value="expert">Expert (Experienced pet parent)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="favoritePet">Favorite Pet Type</label>
                    <select
                      id="favoritePet"
                      name="favoritePet"
                      value={profileData.favoritePet}
                      onChange={handleProfileChange}
                    >
                      <option value="">Select favorite pet</option>
                      <option value="dog">🐕 Dog</option>
                      <option value="cat">🐈 Cat</option>
                      <option value="bird">🦜 Bird</option>
                      <option value="rabbit">🐇 Rabbit</option>
                      <option value="fish">🐠 Fish</option>
                      <option value="other">🦔 Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button type="button" className="primary-button" onClick={handleSaveProfile}>
                    Complete Profile
                  </button>
                </div>
              </form>
            </section>
          ) : editingProfile ? (
            <section className="profile-card edit-profile-form">
              <h3>Edit Profile</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="displayName">Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                  <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>Email cannot be changed</small>
                </div>
                <div className="form-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button type="button" className="primary-button" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                  <button type="button" className="secondary-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          ) : (
            <UserCard
              avatar={currentUser.photoURL || getDefaultAvatar(currentUser.email)}
              name={currentUser.displayName || currentUser.email}
              email={currentUser.email}
              onEdit={handleEditProfile}
              showAvatar={true}
            />
          )}

          {showForm ? (
            <section className="profile-card add-pet-form">
              <h3>Add Your First Pet 🐾</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="image">Pet Photo</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handlePetPhotoUpload}
                    className="file-input"
                  />
                  {formData.image && (
                    <div className="photo-preview">
                      <img src={formData.image} alt="Pet preview" />
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Pet Name *</label>
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
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleFormChange}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="breed">Breed *</label>
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
                    <label htmlFor="age">Age *</label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleFormChange}
                      placeholder="e.g., 2 years, 6 months"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleFormChange}
                      placeholder="e.g., 25 kg"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleFormChange}
                      placeholder="e.g., Golden Brown"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="personality">Personality Traits</label>
                  <textarea
                    id="personality"
                    name="personality"
                    value={formData.personality}
                    onChange={handleFormChange}
                    placeholder="e.g., Friendly, playful, loves to cuddle..."
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="medicalConditions">Medical Conditions</label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleFormChange}
                    placeholder="Any known allergies or medical conditions..."
                    rows={2}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="diet">Diet Information</label>
                  <textarea
                    id="diet"
                    name="diet"
                    value={formData.diet}
                    onChange={handleFormChange}
                    placeholder="Special diet requirements, favorite foods..."
                    rows={2}
                  />
                </div>
                <button type="button" className="primary-button" onClick={handleSavePet}>
                  Save Pet 🐾
                </button>
              </form>
            </section>
          ) : (
            <>
              <section className="profile-card pets-card">
                <div className="pets-header">
                  <div>
                    <h3>My Pets</h3>
                    <p>Keep track of your furry family members.</p>
                  </div>
                  <button
                    type="button"
                    className="add-pet-button"
                    onClick={handleAddPet}
                    style={{
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(40, 167, 69, 0.3)';
                    }}
                  >
                    + Add Pet
                  </button>
                </div>
                <div className="pets-grid">
                  {pets.map((pet) => (
                    <div key={pet.id} className="pet-card-wrapper">
                      <PetCard pet={pet} onSelect={handlePetSelect} />
                      <button
                        type="button"
                        className="remove-pet-button"
                        onClick={() => handleRemovePet(pet.id)}
                      >
                        Remove Pet
                      </button>
                    </div>
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
      
      {showSimba && (
        <SimbaAssistant 
          pageName="profile" 
          onDismiss={() => setShowSimba(false)} 
        />
      )}
    </div>
  );
};

export default Profile;
