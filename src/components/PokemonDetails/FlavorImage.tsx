import { useEffect, useState } from 'react';
import type { PokemonDetails } from '../../types/pokemon-details';
import type { PokemonSpecies } from '../../types/pokemon-species';
import { Blockquote } from '../Blockquote';

interface FlavorImageProps {
  details: { details: PokemonDetails, species: PokemonSpecies; };
  spriteUrl: string;
}



export const FlavorImage = (props: FlavorImageProps) => {
  const [flavorText, setFlavorText] = useState("")
  useEffect(() => {
    const flavorTextEntries = props.details.species.flavor_text_entries
    if (flavorTextEntries) {
      const englishEntries =
        flavorTextEntries
          .filter(entry => entry.language.name === 'en')
          .map(entry => entry.flavor_text.replace(/\f/g, ' '))
      
      if (englishEntries.length > 0 ) {
        const randomIndex = Math.floor(Math.random() * englishEntries.length)
        setFlavorText(englishEntries[randomIndex])
      }
    }
  },[])

  return (
    <div>

      <img
        src={props.spriteUrl}
        onError={(e) => {
          e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
        }}
        loading='lazy'

        alt={props.details.details.name}
        className="w-64 h-64 object-contain antialiased mx-auto my-4"
        style={{ maxWidth: '100%', maxHeight: '400px' }}
      />

      <Blockquote >
        {
          flavorText
        }
      </Blockquote>
    </div>
  );
};
