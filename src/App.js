import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button>Search</button>
      </div>
      <div>search query: {searchQuery}</div>
      <ul>
        <li>list item</li>
      </ul>
    </div>
  );
}
