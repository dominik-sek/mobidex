import { apiClient } from './apiClient';

export const fetchAllPokemon = () => {
  apiClient.get('/pokemon?limit=-1')
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Error fetching all Pokémon:', error);
      throw error;
    });
}

export const fetchPokemonDetailsById = async (id: string) => {
  const [pokemonDetails, pokemonSpeciesDetails] = await Promise.all([
    apiClient.get(`/pokemon/${id}`),
    apiClient.get(`/pokemon-species/${id}`)
  ]);
  
  return [pokemonDetails, pokemonSpeciesDetails];
};
