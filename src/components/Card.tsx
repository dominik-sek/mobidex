interface CardProps {
    pokemon: {
        name: string;
        id: number;
    };
}
import { useState } from 'react';
import { useNavigate } from 'react-router';
export const Card = (props: CardProps) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/pokemon/${props.pokemon.id}`);
    };
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${props.pokemon.id}.png`;
    return (


        <div className="max-w-sm rounded shadow-lg">
            <img loading='lazy' src={pokemonImageUrl} alt={props.pokemon.name} className="w-full p-2 h-48 object-cover cursor-pointer" onClick={handleClick} />
                <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 capitalize text-center">{props.pokemon.name}</div>
                </div>
                {/* <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hash</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#hash</span>

                </div> */}
        </div>
    )
        ;
};
