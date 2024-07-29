import { useState } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <img
          src="src/assets/icons/SearchIcon.svg"
          className="search-bar__button"
          aria-hidden="true"
          alt="Search Icon"
        />
        <label htmlFor="search-bar-input" className="search-bar__label">
          Search Pokémon by name or number
        </label>
        <input
          type="text"
          id="search-bar-input"
          placeholder="Search by name or number"
          className="search-bar__input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};