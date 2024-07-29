import React from "react";
import "./DropdownButton.scss";

interface DropdownButtonProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  text: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  isOpen,
  toggleDropdown,
  text,
}) => {
  return (
    <button
      onClick={toggleDropdown}
      className={`type-filter-dropdown__button ${
        isOpen ? "type-filter-dropdown__button--open" : ""
      }`}
    >
      <p className="type-filter-dropdown__text">{text}</p>
      <img
        src="src/assets/icons/arrowFilter.svg"
        className={`type-filter-dropdown__button__arrow ${
          isOpen ? "type-filter-dropdown__button__arrow--down" : ""
        }`}
        aria-hidden="true"
      />
    </button>
  );
};
