import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div data-testid="appToShow">
      <div>
        <input
          type="text"
          data-testid="searchInput"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button data-testid="searchButton" onClick={() => {}}>
          Search
        </button>
      </div>
      <div data-testid="searchQuery">search query: {searchQuery}</div>
      <ul>
        <li>list item</li>
      </ul>
    </div>
  );
}
