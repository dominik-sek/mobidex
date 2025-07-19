interface CardProps {
    pokemon: {
        name: string;
        id: string;
    };
}
import { useNavigate } from 'react-router';
export const Card = (props: CardProps) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/pokemon/${props.pokemon.id}`);
    };
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${props.pokemon.id}.png`;
    const pokemonFallbackMissing = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/0.png`;

    return (


        <div className="max-w-sm rounded shadow-lg">
            <object data={pokemonImageUrl} type="image/png" className="w-full h-48 object-contain cursor-pointer" onClick={handleClick}>
                <img loading='lazy' src={pokemonImageUrl} alt={props.pokemon.name} onError={(e) => {
                    e.currentTarget.src = pokemonFallbackMissing;
                    }} className="w-full p-2 h-48 object-contain cursor-pointer" />
                
            </object>
                <div className="px-4 py-2">
                <div className="font-bold text-xl mb-2 capitalize text-center">{props.pokemon.name}</div>
                </div>

        </div>
    )
        ;
};
