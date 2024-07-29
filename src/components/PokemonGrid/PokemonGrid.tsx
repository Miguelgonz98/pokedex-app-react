import React, { useEffect, useState } from "react";
import {
  getPokemonByType,
  getPokemonList,
  Pokemon,
  QUANTITY,
} from "../../service/PokemonService";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import "./PokemonGrid.scss";
import { Pagination } from "../Pagination/Pagination";

interface PokemonGridProps {
  selectedTypes: number[];
  searchQuery: string;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  selectedTypes = [],
  searchQuery,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [allFilteredPokemon, setAllFilteredPokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  const fetchData = async (pageNumber: number) => {
    const offset = (pageNumber - 1) * QUANTITY;
    try {
      setLoading(true);
      if (selectedTypes.length > 0) {
        const data = await getPokemonByType(selectedTypes);
        const filteredData = data.filter(pokemon => 
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredData.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setAllFilteredPokemon(data);
        setPokemonList(filteredData.slice(offset, offset + QUANTITY));
        setTotalPages(Math.ceil(data.length / QUANTITY));
      } else {
        const data = await getPokemonList(12, offset);
        const filteredData = data.results.filter(pokemon => 
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredData.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setPokemonList(filteredData);
        setTotalPages(Math.ceil(data.count / QUANTITY));
      }
    } catch (error) {
      console.error("Error fetching Pokemon list", error);
    } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [offset, selectedTypes]);

  useEffect(() => {
    setPokemonList([]);
    setCurrentPage(1);
    fetchData(1);
  }, [searchQuery, selectedTypes]);

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * QUANTITY);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="pokemon-grid">
        {loading && <div className="pokemon-grid__text">Loading...</div>}
        {notFound && (
          <div className="pokemon-grid__text">No results found for '{searchQuery}'</div>
        )}
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
