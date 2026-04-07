import { useState, useEffect } from "react";
import NavBarComp from "../Components/NavBarComp";
import SearchBar from "../Components/VetFinder/SearchBar";
import LocationButton from "../Components/VetFinder/LocationButton";
import VetList from "../Components/VetFinder/VetList";
import MapView from "../Components/VetFinder/MapView";
import SimbaAssistant from "../Components/SimbaAssistant";
import { triggerAppointmentAlert } from "../Utils/NotificationUtils";
import "./VetFinder.css";

const VetFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [showSimba, setShowSimba] = useState(true);

  // Mock data for vet clinics
  const mockVets = [
    {
      id: 1,
      name: "City Pet Hospital",
      address: "123 Main St, New York, NY 10001",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      phone: "+1-212-555-0123",
      rating: 4.8,
      type: "hospital",
      openNow: true,
      distance: null
    },
    {
      id: 2,
      name: "Happy Paws Veterinary Clinic",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      coordinates: { lat: 40.6782, lng: -73.9442 },
      phone: "+1-718-555-0456",
      rating: 4.9,
      type: "clinic",
      openNow: true,
      distance: null
    },
    {
      id: 3,
      name: "Emergency Pet Care 24/7",
      address: "789 Emergency Rd, Queens, NY 11375",
      coordinates: { lat: 40.7282, lng: -73.7949 },
      phone: "+1-718-555-0789",
      rating: 4.6,
      type: "emergency",
      openNow: true,
      distance: null
    },
    {
      id: 4,
      name: "Gentle Care Animal Hospital",
      address: "321 Care Blvd, Manhattan, NY 10025",
      coordinates: { lat: 40.8014, lng: -73.9669 },
      phone: "+1-212-555-0321",
      rating: 4.7,
      type: "hospital",
      openNow: false,
      distance: null
    },
    {
      id: 5,
      name: "Pawsitive Wellness Center",
      address: "654 Wellness Way, Bronx, NY 10451",
      coordinates: { lat: 40.8448, lng: -73.8648 },
      phone: "+1-718-555-0654",
      rating: 4.5,
      type: "clinic",
      openNow: true,
      distance: null
    },
    {
      id: 6,
      name: "Animal Medical Center",
      address: "987 Medical Dr, Staten Island, NY 10301",
      coordinates: { lat: 40.5795, lng: -74.1502 },
      phone: "+1-718-555-0987",
      rating: 4.8,
      type: "hospital",
      openNow: true,
      distance: null
    },
    {
      id: 7,
      name: "Quick Care Vet Clinic",
      address: "147 Quick St, New York, NY 10003",
      coordinates: { lat: 40.7260, lng: -73.9897 },
      phone: "+1-212-555-0147",
      rating: 4.4,
      type: "clinic",
      openNow: true,
      distance: null
    },
    {
      id: 8,
      name: "Pet Emergency Services",
      address: "258 Crisis Ave, Brooklyn, NY 11215",
      coordinates: { lat: 40.6688, lng: -73.9897 },
      phone: "+1-718-555-0258",
      rating: 4.7,
      type: "emergency",
      openNow: true,
      distance: null
    }
  ];

  useEffect(() => {
    setVets(mockVets);
    setFilteredVets(mockVets);
    
    // Trigger appointment alert after page load
    triggerAppointmentAlert();
  }, []);

  useEffect(() => {
    filterVets();
  }, [searchQuery, selectedFilter, vets]);

  const filterVets = () => {
    let filtered = vets;

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      filtered = filtered.filter(vet => 
        vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedFilter !== "all") {
      filtered = filtered.filter(vet => vet.type === selectedFilter);
    }

    // Calculate distances if user location is available
    if (userLocation) {
      filtered = filtered.map(vet => ({
        ...vet,
        distance: calculateDistance(userLocation, vet.coordinates)
      })).sort((a, b) => a.distance - b.distance);
    }

    setFilteredVets(filtered);
  };

  const calculateDistance = (loc1, loc2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1); // Distance in km
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleVetSelect = (vet) => {
    setSelectedVet(vet);
  };

  const getDirections = (vet) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${vet.coordinates.lat},${vet.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const callVet = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="vet-finder">
      <NavBarComp />
      <main className="vet-finder-shell">
        <div className="vet-finder-section">
          <div className="page-header">
            <h1>🏥 Vet Finder 🐾</h1>
            <p>Find the best veterinary care for your furry friends nearby!</p>
          </div>

          <div className="search-section">
            <SearchBar 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              selectedFilter={selectedFilter}
            />
            <LocationButton 
              onLocationRequest={handleLocationRequest}
              userLocation={userLocation}
            />
          </div>

          <div className="content-section">
            <div className="vet-list-section">
              <VetList 
                vets={filteredVets}
                onVetSelect={handleVetSelect}
                selectedVet={selectedVet}
                getDirections={getDirections}
                callVet={callVet}
                userLocation={userLocation}
              />
            </div>
            <div className="map-section">
              <MapView 
                selectedVet={selectedVet}
                userLocation={userLocation}
              />
            </div>
          </div>
        </div>
      </main>
      
      {showSimba && (
        <SimbaAssistant 
          pageName="vet-finder" 
          onDismiss={() => setShowSimba(false)} 
        />
      )}
    </div>
  );
};

export default VetFinder;
