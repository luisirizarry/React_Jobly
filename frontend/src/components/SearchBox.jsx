import React, { useState } from "react";
import "./SearchBox.css";

const SearchBox = ({ searchFunction, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFunction(searchTerm.trim());
  };

  const handleReset = () => {
    setSearchTerm("");
    searchFunction("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button
        type="submit"
        className="search-button"
        disabled={!searchTerm.trim()}
      >
        Search
      </button>
      <button type="button" className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default SearchBox;
