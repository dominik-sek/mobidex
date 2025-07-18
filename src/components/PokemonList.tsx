import {useEffect, useState} from "react";
import {Searchbar} from "./Searchbar.tsx";
import {Card} from "./Card.tsx";
import { Pagination } from './Pagination.tsx';

interface PokemonListProps {
    //todo
}


export const PokemonList = (props: PokemonListProps) =>{
    const [pokemonList, setPokemonList] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [maxResults, setMaxResults] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        fetch('https://pokeapi.co/api/v2/pokemon?limit=-1', {
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
        <div className="flex flex-col justify-between w-full h-3/4 gap-2 divide-y-1">
            <div className='max-h-1/6 '>
                <Searchbar />

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 overflow-auto gap-2">
                {
                    pokemonList.results.map((pokemon, index)=>{
                        return <Card key={index} pokemon={{name: pokemon.name, id: index+1}}/>
                    })
                }
            </div>

            <div className='max-h-1/6 flex w-full items-center'>
            <p className="text-sm text-gray-500">Total Pokemon: {pokemonList.count}</p>
                    <p className="text-sm text-gray-500">Showing {pokemonList.results.length} Pokemon</p>

                <Pagination />
                                    <p className="text-sm text-gray-500">Page 1 of {Math.ceil(pokemonList.count / 20)}</p>

            </div>
        </div>
    )
    }
}
