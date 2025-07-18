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
