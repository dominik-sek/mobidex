import { useState } from 'react';
import { Link } from 'react-router';
import type { PokemonBaseInfo } from '../types/pokemon';

interface CardProps {
	className?: string;
	pokemon: PokemonBaseInfo;
	prevNeighbor?: PokemonBaseInfo | null;
	nextNeighbor?: PokemonBaseInfo | null;
}

export const Card = (props: CardProps) => {
	const [loaded, setLoaded] = useState(false);

	const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemon.id}.svg`;
	const pokemonFallbackMissing = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/0.png`;

	return (
		<div
			className={`relative h-full w-full min-w-36 max-w-72 max-h-48 bg-white/30 hover:bg-white/60 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border border-gray-100 ${props.className || ''}`}>
			<Link to={`/pokemon/${props.pokemon.id}`}>
				{!loaded && (
					<div className=" absolute inset-0 m-6 rounded-md bg-gray-200 animate-pulse"></div>
				)}
				<object
					data={pokemonImageUrl}
					type="image/svg"
					className="relative w-full h-32 p-6 object-contain cursor-pointer">
					<img
						onLoad={() => setLoaded(true)}
						loading="lazy"
						src={pokemonImageUrl}
						alt={props.pokemon.name}
						onError={(e) => {
							e.currentTarget.src = pokemonFallbackMissing;
							setLoaded(true);
						}}
						className="absolute top-0 left-0 w-full p-6 h-32 object-contain cursor-pointer"
					/>
				</object>
				<div className="px-4 py-2">
					<div className="font-medium text-xl mb-2 capitalize text-center">
						{props.pokemon.name}
					</div>
				</div>
			</Link>
		</div>
	);
};
