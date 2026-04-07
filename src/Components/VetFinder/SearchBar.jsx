import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, onFilterChange, selectedFilter }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="🔍 Search by city, area, or hospital name..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
        
        <div className="filter-container">
          <label htmlFor="filter" className="filter-label">
            Filter:
          </label>
          <select
            id="filter"
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="clinic">Clinics</option>
            <option value="hospital">Hospitals</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
