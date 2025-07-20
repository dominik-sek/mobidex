import { Link } from 'react-router';
import type { Pokemon } from '../types/pokemon';

interface CardProps {
    className?: string;
    pokemon: {
        name: string;
        id: string;
    };

}

export const Card = (props: CardProps) => {

    
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemon.id}.svg`;
    const pokemonFallbackMissing = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/0.png`;

    return (

        <div className={`h-full w-full sm:w-36 max-h-48 bg-white/30 hover:bg-white/60 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border border-gray-100 ${props.className || ""}`}>
            <Link to={`/pokemon/${props.pokemon.id}`}>
            <object data={pokemonImageUrl} type="image/svg" className="relative w-full h-32 p-6 object-contain cursor-pointer" >
                <img loading='lazy' src={pokemonImageUrl} alt={props.pokemon.name} onError={(e) => {
                    e.currentTarget.src = pokemonFallbackMissing;
                    }}
                        className="absolute top-0 left-0 w-full p-6 h-32 object-contain cursor-pointer" />
            </object>
                <div className="px-4 py-2">
                <div className="font-medium text-xl mb-2 capitalize text-center">{props.pokemon.name}</div>
            </div>
            </Link>        

        </div>
    )
        ;
};
