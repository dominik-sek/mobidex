import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { fetchPokemonDetailsById } from '../api';
import { Wrapper } from './Wrapper';

export const PokemonDetails = () => {
  const params = useParams<{ id?: string; name?: string; }>()

  const [pokemonDetails, setPokemonDetails] = useState(null);
  useEffect( () => {
    if (params.id) {
      fetchPokemonDetailsById(params.id)
        .then(([details, species]) => {
          setPokemonDetails({ ...details, species: species });
        })
        .catch(error => {
          console.error('Error fetching Pokemon details:', error);
        });
    }
  }, [params.id]);
  return (
    <Wrapper>
      
    </Wrapper>

  )
}
