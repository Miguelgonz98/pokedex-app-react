import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";
export const QUANTITY = 12;
export const LIMIT = 1025;

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  types: string[];
}

interface RawPokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

export const getPokemonList = async (
  limit: number = 12,
  offset: number = 0
): Promise<{
  count: number;
  results: Pokemon[];
  next: string;
  previous: string;
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon`, {
      params: { limit, offset },
    });

    const detailedPokemonList = await Promise.all(
      response.data.results.map(
        async (pokemon: { name: string; url: string }) => {
          const details = await getPokemonDetails(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: details.id,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types.map(
              (type: { type: { name: string } }) => type.type.name
            ),
          };
        }
      )
    );

    return {
      count: response.data.count,
      results: detailedPokemonList,
      next: response.data.next,
      previous: response.data.previous,
    };
  } catch (error) {
    console.error("Error fetching Pokemon list", error);
    throw error;
  }
};

export const getPokemonByType = async (
  typeIds: number[]
): Promise<Pokemon[]> => {
  try {
    const responses = await Promise.all(
      typeIds.map((id) => axios.get(`${API_BASE_URL}/type/${id}`))
    );
    const allPokemonByType = responses.map((response) =>
      response.data.pokemon.map((p: RawPokemon) => p.pokemon)
    );
    const intersectedPokemon = allPokemonByType.reduce((acc, current) => {
      return acc.filter((pokemon: RawPokemon["pokemon"]) =>
        current.some((p: RawPokemon["pokemon"]) => p.name === pokemon.name)
      );
    });
    const detailedPokemonList = await Promise.all(
      intersectedPokemon.map(async (pokemon: RawPokemon["pokemon"]) => {
        const details = await getPokemonDetails(pokemon.url);
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: details.id,
          image: details.sprites.other["official-artwork"].front_default,
          types: details.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
        };
      })
    );

    return detailedPokemonList;
  } catch (error) {
    console.error(`Error fetching Pokemon by type`, error);
    throw error;
  }
};

export const getPokemonDetails = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokemon`, error);
    throw error;
  }
};
