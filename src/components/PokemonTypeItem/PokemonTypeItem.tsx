import React from "react";
import "./PokemonTypeItem.scss";
import { assignTypeIcon } from "../../assets/pokemonTypes";
import { capitalizeFirstLetter } from "../../assets/utils";

interface PokemonTypeItemProps {
  name: string;
}

export const PokemonTypeItem: React.FC<PokemonTypeItemProps> = ({ name }) => {
  return (
    <div className="pokemon-type">
      <div className={`pokemon-type__image pokemon-type__image__${name}`}>
        <img
          src={assignTypeIcon(name)}
          className="pokemon-type__icon"
        />
      </div>
      <p className="pokemon-type__text">{capitalizeFirstLetter(name)}</p>
    </div>
  );
};
