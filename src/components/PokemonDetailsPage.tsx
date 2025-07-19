import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { fetchPokemonDetailsById } from '../api';
import { Wrapper } from './Wrapper';
import type { PokemonDetails } from '../types/pokemon-details';
import type { PokemonSpecies } from '../types/pokemon-species';

export const PokemonDetailsPage = () => {
  const params = useParams<{ id?: string; name?: string; }>()

  const [pokemonDetails, setPokemonDetails] = useState<{details: PokemonDetails, species: PokemonSpecies}>()
  useEffect( () => {
    if (params.id) {
      fetchPokemonDetailsById(params.id)
        .then(({details, species}) => {
          setPokemonDetails({details, species});
        })
        .catch(error => {
          console.error('Error fetching Pokemon details:', error);
        });
    }
  }, [params.id]);
  console.log(pokemonDetails);
  return (
    <Wrapper>
      Pokemon name: {pokemonDetails?.details.name} <br />
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${params.id}.png`}
          alt={pokemonDetails?.details.name}
          className="w-48 h-48 object-contain"
        />
        <h1 className="text-2xl font-bold mt-4">{pokemonDetails?.details.name}</h1>
    </div>

    </Wrapper>
  )
}
