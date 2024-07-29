import { useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import "./PokedexListPage.scss";
import classNames from "classnames";
import { useScroll } from "../../hooks/useScroll";
import { FilterDropdown } from "../../components/FilterDropdown/FilterDropdown";
import { FilterModal } from "../../components/FilterModal/FilterModal";
import { PokemonGrid } from "../../components/PokemonGrid/PokemonGrid";
import { useMobile } from "../../hooks/useMobile";

export const PokedexListPage = () => {
  const scrolled = useScroll(90);
  const [visibleComponent, setVisibleComponent] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const isMobile = useMobile();

  const searchComponentName = "search";
  const dropdownComponentName = "dropdown";
  const toggleSearch = () => {
    setVisibleComponent(
      visibleComponent === searchComponentName ? null : searchComponentName
    );
  };
  const toggleDropdown = () => {
    setVisibleComponent(
      visibleComponent === dropdownComponentName ? null : dropdownComponentName
    );
  };
  const handleClear = () => {
    setSearchInput("");
  };

  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const handleSaveFilters = (filters: number[]) => {
    setSelectedTypes(filters);
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  return (
    <>
      <div
        className={classNames("search-header", {
          "search-header--scrolled": scrolled,
        })}
      >
        {isMobile && scrolled && (
          <div className="header-elements">
            <p className="header-elements__text">Pokédex</p>
            <div className="header-elements__options">
              <button
                onClick={toggleSearch}
                className="header-elements__show-option-btn"
                aria-label="Toggle Search Pokemon Button"
              >
                <img src="src/assets/icons/SearchIcon.svg" aria-hidden="true" />
              </button>
              <button
                onClick={toggleDropdown}
                className="header-elements__show-option-btn"
                aria-label="Toggle Filter Pokemon Button"
              >
                <img src="src/assets/icons/FilterIcon.svg" aria-hidden="true" />
              </button>
            </div>
            {visibleComponent === searchComponentName && (
              <div className="header-elements__displayed">
                <SearchBar onSearch={handleSearch} />
                <button
                  onClick={handleClear}
                  className="header-elements__hide-btn"
                  aria-label="Clear Search Bar Button"
                >
                  <img
                    src="src/assets/icons/clearSearchButton.svg"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
            {visibleComponent === dropdownComponentName && (
              <div className="header-elements__displayed">
                {/* TODO: Mobile dropdown content goes here */}
                <button
                  className="header-elements__hide-btn"
                  aria-label="Clear Dropdown Button"
                >
                  <img
                    src="src/assets/icons/clearSearchButton.svg"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="pokedex-content" aria-label="Pokédex Page Content">
        <h2 className="pokedex-content__header-text">Pokédex</h2>
        <div className="pokedex-content__options" aria-label="Content Options">
          <div className="pokedex-content__search-bar">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="pokedex-content__dropdown">
            <FilterDropdown
              selectedTypes={selectedTypes}
              onSelectedTypesChange={handleSaveFilters}
            />
          </div>
          <div className="pokedex-content__dropdown-modal">
            <FilterModal
              selectedTypes={selectedTypes}
              onSave={handleSaveFilters}
            />
          </div>
        </div>
        <PokemonGrid selectedTypes={selectedTypes} searchQuery={searchInput} />
      </div>
    </>
  );
};
