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
    const [fileteredPokemon, setFilteredPokemon] = useState([]);
    const startedTyping = searchQuery.length > 0;


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setFilteredPokemon(
            pokemonList.results?.filter((pokemon: { name: string; }) => pokemon.name.toLowerCase().includes(searchQuery))
        );
        console.log(fileteredPokemon);
    };
    
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    const hasNextPage = () => {
        
        return (currentPage * maxResults) < (startedTyping ? fileteredPokemon.length : pokemonList.results.length);
    };

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
        <div className="flex flex-col justify-between w-full h-3/4 gap-2">
            <div className='max-h-1/6 '>
                <Searchbar onChange={handleSearchChange} />

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 overflow-auto gap-2">
                {
                    (startedTyping ? fileteredPokemon : pokemonList.results)?.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 divide-y-0">
                            No Pokemon found for "{searchQuery}"
                        </div>
                    ) :
                    (startedTyping ? fileteredPokemon : pokemonList.results)?.slice((currentPage - 1) * maxResults, currentPage * maxResults).map((pokemon, index: number) => (
                        <Card key={index} pokemon={{name: pokemon.name, id: pokemon.url.split('/')[6]}} />
                    ))
                    
                }
            </div>

            <div className='max-h-1/6 flex items-center justify-center w-full border'>

                <Pagination currentPage={currentPage} onPageChange={onPageChange} hasNext={hasNextPage()}  />

            </div>
        </div>
    )
    }
}
