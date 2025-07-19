import type { Pokemon } from '../types/pokemon';
import type { PokemonDetails } from '../types/pokemon-details';
import type { PokemonEvolutionChain } from '../types/pokemon-evolution-chain';
import type { PokemonSpecies } from '../types/pokemon-species';

import { apiClient } from './apiClient';

export const fetchAllPokemon = ():Promise<Pokemon> => {
  return apiClient.get<Pokemon>('/pokemon?limit=-1')
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Error fetching all Pokémon:', error);
      throw error;
    });
}

export const fetchPokemonDetailsById = async (id: string): Promise<{details: PokemonDetails, species: PokemonSpecies}> => {
  const [pokemonDetails, pokemonSpeciesDetails] = await Promise.all([
    apiClient.get<PokemonDetails>(`/pokemon/${id}`),
    apiClient.get<PokemonSpecies>(`/pokemon-species/${id}`),
  ]);
  
  return {
    details: pokemonDetails,
    species: pokemonSpeciesDetails,
  }
};

export const fetchPokemonEvolutionChainById = async (id: string): Promise<PokemonEvolutionChain> => {
  return apiClient.get<PokemonEvolutionChain>(`/evolution-chain/${id}`)

};
export const fetchPokemonSpeciesById = async (id: string): Promise<PokemonSpecies> => {
  return apiClient.get<PokemonSpecies>(`/pokemon-species/${id}`)
}
