import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { fetchPokemonDetailsById } from '../api';
import { Wrapper } from './Wrapper';
import type { PokemonDetails } from '../types/pokemon-details';
import type { PokemonSpecies } from '../types/pokemon-species';
import { Blockquote } from './Blockquote';


const statNameMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed'
}

const typeToColorMap: Record<string, string> = {
  normal: 'bg-gray-300',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-pink-500',
  poison: 'bg-purple-500',
  ground: 'bg-brown-500',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-300',
  bug: 'bg-lime-500',
  rock: 'bg-gray-600',
  ghost: 'bg-indigo-700',
  dragon: 'bg-blue-800',
  dark: 'bg-gray-800',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-200'
};

export const PokemonDetailsPage = () => {

  const params = useParams<{ id?: string; name?: string; }>()
  const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id}.svg`
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
      <h2 className="capitalize text-2xl font-bold mt-4">{pokemonDetails?.details.name}</h2>
      <p className="text-sm text-gray-600">
            {pokemonDetails?.species.genera.find(genus => genus.language.name === 'en')?.genus}
          </p>
      {
        pokemonDetails?.details.types.map((type) => (
          <span className={`inline-flex items-center rounded-md  px-2 py-1 text-md font-medium ring-1 ring-gray-500/10 ring-inset ${typeToColorMap[type.type.name]}`} >
            {type.type.name}
          </span>
        ))
      }
        <img
        src={pokemonSpriteUrl}
        onError={(e) => {
          e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
        }}
        loading='lazy'
        
          alt={pokemonDetails?.details.name}
          className="w-64 h-64 object-contain antialiased mx-auto my-4"
          style={{ maxWidth: '100%', maxHeight: '400px' }}
      />
      <Blockquote>
      {
        pokemonDetails?.species.flavor_text_entries
          .filter(entry => entry.language.name === 'en')
          .map(entry => entry.flavor_text.replace(/\f/g, ' '))
          .sort(() => Math.random() - 0.5)[0]
      }
      </Blockquote>

      <div className="flex flex-col items-center justify-center h-screen">
        Stats:
        <ul className="list-disc">
          {pokemonDetails?.details.stats.map((stat) => (
            <li key={stat.stat.name}>
              {statNameMap[stat.stat.name]}: {stat.base_stat}
            </li>
          ))}
        </ul>
        Abilities:
        <ul className="list-disc capitalize">
          {pokemonDetails?.details.abilities.map((ability) => (
            <li key={ability.ability?.name}>
              {ability.ability?.name}
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center">


          <p className="text-sm text-gray-600">
            Habitat: {pokemonDetails?.species.habitat?.name || 'Unknown'}
          </p>
          </div>

    </div>

    </Wrapper>
  )
}
