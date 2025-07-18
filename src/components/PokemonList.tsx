import {useEffect, useState} from "react";
import {Searchbar} from "./Searchbar.tsx";
import {ListItem} from "./ListItem.tsx";

interface PokemonListProps {
    //todo
}


export const PokemonList = (props: PokemonListProps) =>{
    const [pokemonList, setPokemonList] = useState([])

    useEffect(() => {

        fetch('https://pokeapi.co/api/v2/pokemon', {
            method: 'GET',
        }).then(async (res) => {
            let response = await res.json()
            console.log(response)
            setPokemonList(response)

        })

    }, [])
    
    if (!pokemonList.results) {
        return <div>Loading...</div>
    }
    else {
        
    
    return(
        <div className="flex flex-col justify-between w-full h-3/4 gap-2 border border-amber-200 divide-y-1">
            <div className='max-h-1/6 '>
                <Searchbar />
            </div>

            <div className="flex flex-col divide-y-2 flex-auto overflow-y-auto">
                {
                    pokemonList.results.map((pokemon, index)=>{
                        return <ListItem key={index} pokemon={{name: pokemon.name, id: index+1}}/>
                    })
                }
            </div>

            <div className='max-h-1/6 '>
                <div className="flex space-x-1">
                    <button className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        Prev
                    </button>
                    <button className="min-w-9 rounded-md bg-slate-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        1
                    </button>
                    <button className="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        2
                    </button>
                    <button className="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        3
                    </button>
                    <button className="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
    }
}
