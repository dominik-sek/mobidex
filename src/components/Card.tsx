interface CardProps {
    pokemon: {
        name: string;
        id: number;
    }
}
import { useNavigate } from 'react-router';
export const Card = (props: CardProps) => {
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/pokemon/${props.pokemon.id}`);
    }
    return (
        <div className="p-2 border flex items-center flex-col capitalize h-56" onClick={handleClick}>
             <span className="ml-2 text-gray-500">#{props.pokemon.id}</span>

            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${props.pokemon.id}.png`} />
            
            <h3 className="text-xl font-bold">{props.pokemon.name}</h3>
            <div className="flex-grow"></div>

            
        </div>
    )
}
