import { capitalizeFirstLetter } from "../../assets/utils";
import { Pokemon } from "../../service/PokemonService";
import { PokemonTypeItem } from "../PokemonTypeItem/PokemonTypeItem";
import "./PokemonCard.scss";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <button className="pokemon-card">
      <div className="pokemon-card__container">
      <div className="pokemon-card__img">
        <img
          className="pokemon-card__image"
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>
      <div className="pokemon-card__data">
        <div className="pokemon-card__text">
        <h3 className="pokemon-card__name">
          {capitalizeFirstLetter(pokemon.name)}
        </h3>
        <p className="pokemon-card__number">
          {`#${pokemon.id.toString().padStart(4, "0")}`}
        </p>
        </div>
        <div className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <PokemonTypeItem key={type} name={type} />
          ))}
        </div>
      </div>
    </div>
    </button>
  );
};
