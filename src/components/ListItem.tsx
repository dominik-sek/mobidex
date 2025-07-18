interface ListItemProps {
    pokemon: {
        name: string;
        id: number;
    }
}
export const ListItem = (props: ListItemProps) => {
    return (
        <div className=" min-h-24 p-2 flex items-center capitalize">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${props.pokemon.id}.png`} />
            <h3 className="text-xl font-bold">{props.pokemon.name}</h3>
        </div>
    )
}