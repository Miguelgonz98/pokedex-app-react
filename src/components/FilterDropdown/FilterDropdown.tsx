import { useEffect, useRef, useState } from "react";
import "./FilterDropdown.scss";
import { pokemonTypes } from "../../assets/pokemonTypes";
import { PokemonTypeItem } from "../PokemonTypeItem/PokemonTypeItem";
import { Checkbox } from "../Checkbox/Checkbox";
import { DropdownButton } from "../DropdownButton/DropdownButton";

interface FilterDropdownProps {
  selectedTypes: number[];
  onSelectedTypesChange: (selectedTypes: number[]) => void;
}

export const FilterDropdown = ({
  selectedTypes,
  onSelectedTypesChange,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (type: number) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onSelectedTypesChange(newSelectedTypes);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="type-filter-dropdown" ref={dropdownRef}>
      <DropdownButton
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        text="Filter by type"
      />
      {isOpen && (
        <div className="type-filter-dropdown__menu">
          {pokemonTypes.map((type) => (
            <label
              key={type.value}
              className="type-filter-dropdown__item"
              tabIndex={0}
            >
              <Checkbox
                checked={selectedTypes.includes(type.value)}
                onChange={() => handleCheckboxChange(type.value)}
              />
              <PokemonTypeItem name={type.name} />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
