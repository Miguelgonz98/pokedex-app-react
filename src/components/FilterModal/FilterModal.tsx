import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import "./FilterModal.scss";
import { DropdownButton } from "../DropdownButton/DropdownButton";
import { pokemonTypes } from "../../assets/pokemonTypes";
import { Checkbox } from "../Checkbox/Checkbox";
import { PokemonTypeItem } from "../PokemonTypeItem/PokemonTypeItem";

interface FilterModalProps {
  selectedTypes: number[];
  onSave: (selectedFilters: number[]) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ selectedTypes, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedTypes, setLocalSelectedTypes] = useState<number[]>([]);

  useEffect(() => {
    setLocalSelectedTypes(selectedTypes);
  }, [selectedTypes]);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (type: number) => {
    setLocalSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const handleSave = () => {
    onSave(localSelectedTypes);
    toggleModal();
  };

  return (
    <div className="filter-modal">
      <DropdownButton
        isOpen={isOpen}
        toggleDropdown={toggleModal}
        text="Filter by type"
      />
      <Modal isOpen={isOpen} onClose={handleSave} className="dropdown">
        <div className="filter-modal__dropdown-menu">
          {pokemonTypes.map((type) => (
            <label
              key={type.value}
              className="filter-modal__dropdown-item"
              tabIndex={0}
              aria-label={`Type ${type.name}`}
            >
              <Checkbox
                checked={localSelectedTypes.includes(type.value)}
                onChange={() => handleCheckboxChange(type.value)}
              />
              <PokemonTypeItem name={type.name} />
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
};
