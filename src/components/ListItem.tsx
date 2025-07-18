interface ListItemProps {
    pokemon: {
        name: string;
        id: number;
    }
}
export const ListItem = (props: ListItemProps) => {
    return (
        <div className=" min-h-24 p-2 flex items-center capitalize" onClick={() => {
            console.log(`Clicked on ${props.pokemon.id}`);
        }}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${props.pokemon.id}.png`} />
            <h3 className="text-xl font-bold">{props.pokemon.name}</h3>
            <span className="ml-2 text-gray-500">#{props.pokemon.id}</span>
            <div className="flex-grow"></div>
            <button className="rounded-md bg-slate-800 py-2 px-3
                border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Details
            </button>
            
        </div>
    )
}
