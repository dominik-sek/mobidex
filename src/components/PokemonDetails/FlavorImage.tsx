import { useEffect, useState } from 'react';
import type { PokemonDetails } from '../../types/pokemon-details';
import type { PokemonSpecies } from '../../types/pokemon-species';
import { Blockquote } from '../Blockquote';
import { LoadingSpinner } from '../LoadingSpinner';

interface FlavorImageProps {
	details: { details: PokemonDetails; species: PokemonSpecies };
	spriteUrl: string;
}

export const FlavorImage = (props: FlavorImageProps) => {
  const [flavorText, setFlavorText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		const flavorTextEntries = props.details.species.flavor_text_entries;
		if (flavorTextEntries) {
			const englishEntries = flavorTextEntries
				.filter((entry) => entry.language.name === 'en')
				.map((entry) => entry.flavor_text.replace(/\f/g, ' '));

			if (englishEntries.length > 0) {
				const randomIndex = Math.floor(
					Math.random() * englishEntries.length,
				);
				setFlavorText(englishEntries[randomIndex]);
			}
		}
	}, []);

	return (
    <div>
      {!imageLoaded && (
        <div className="flex justify-center items-center w-64 h-64 mx-auto my-4 ">
          <LoadingSpinner />
        </div>
      )}
			<img
        src={props.spriteUrl}
        onLoad={()=>setImageLoaded(true)}
				onError={(e) => {
					e.currentTarget.src =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
          setImageLoaded(true)
				}}
				loading="lazy"
				alt={props.details.details.name}
				className={`w-64 h-64 object-contain antialiased mx-auto my-4 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'} `}
				style={{ maxWidth: '100%', maxHeight: '400px' }}
			/>

			<Blockquote>{flavorText}</Blockquote>
		</div>
	);
};
