import React from "react";

export default function Header({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <div className="contianer__header">
      <div className="container__heading">Demo Assignment App</div>
      <div className="container__search__box">
        <input
          type="text"
          data-testid="searchInput"
          value={searchQuery}
          placeholder="Search here"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button data-testid="searchButton" onClick={onSearch}>
          Search
        </button>
      </div>
      <div className="container__info" data-testid="searchQuery">
        search query: {searchQuery}
      </div>
    </div>
  );
}
