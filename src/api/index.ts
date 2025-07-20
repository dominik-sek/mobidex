import type { Ability } from '../types/ability';
import type { Pokemon } from '../types/pokemon';
import type { PokemonDetails } from '../types/pokemon-details';
import type { Move } from '../types/move';
import type { PokemonEvolutionChain } from '../types/pokemon-evolution-chain';
import type { PokemonSpecies } from '../types/pokemon-species';

import { apiClient } from './apiClient';

export const fetchOnePokemon = (pokemonId: string): Promise<Pokemon> => {
	return apiClient.get<Pokemon>(`/pokemon/${pokemonId}`);
};

export const fetchAllPokemon = (): Promise<Pokemon> => {
	return apiClient.get<Pokemon>('/pokemon?limit=-1');
};

export const fetchPokemonDetailsById = async (
	pokemonId: string,
): Promise<{ details: PokemonDetails; species: PokemonSpecies }> => {
	const [pokemonDetails, pokemonSpeciesDetails] = await Promise.all([
		apiClient.get<PokemonDetails>(`/pokemon/${pokemonId}`),
		apiClient.get<PokemonSpecies>(`/pokemon-species/${pokemonId}`),
	]);

	return {
		details: pokemonDetails,
		species: pokemonSpeciesDetails,
	};
};

export const fetchPokemonEvolutionChainById = async (
	evolutionChainId: string,
): Promise<PokemonEvolutionChain> => {
	return apiClient.get<PokemonEvolutionChain>(
		`/evolution-chain/${evolutionChainId}`,
	);
};
export const fetchPokemonSpeciesById = async (
	pokemonSpeciesId: string,
): Promise<PokemonSpecies> => {
	return apiClient.get<PokemonSpecies>(
		`/pokemon-species/${pokemonSpeciesId}`,
	);
};
export const fetchAbilityDetailsById = async (
	abilityId: string,
): Promise<Ability> => {
	return apiClient.get<Ability>(`/ability/${abilityId}`);
};
export const fetchMoveDetailsById = async (moveId: string): Promise<Move> => {
	return apiClient.get<Move>(`/move/${moveId}`);
};
